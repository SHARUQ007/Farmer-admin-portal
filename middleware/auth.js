const jwt =require('jsonwebtoken');
const config= require('../config/index.js');
const User =require( '../models/user.model.js') 

const { JWT_SECRET } = config;


const auth=
    {
      isAuthenticatedAdmin:function (req,res,next) {
              if (!req.headers.authorization){
                      return res.status(401).json({ msg: 'No token, authorizaton denied' });
              }
              const token = req.headers.authorization.split(" ")[1];
              // Check for token
              if (!token){
                return res.status(401).json({ msg: 'No token, authorizaton denied' });
              }
              try {
                // Verify token
                const decoded = jwt.verify(token, JWT_SECRET);
                // Add user from payload
                req.user = decoded;
                next();
              } catch (e) {
                res.status(400).json(e);
              }
      },
     
      hasPermission: function (role) {
          async function inner(req,res,next){
              const user = await User.findOne({_id:req.user.id});
              // console.log(role,user.admin_roles.includes(role) ,user.admin_roles)
              if(user && (user.admin_roles.includes(role) || user.admin_roles.includes("SUPER_ROLES")) ){
                return next()
              }
              res.sendStatus(401) 
          }
          return inner;
      }

    }
module.exports = auth;