const jwt =require('jsonwebtoken');
const config= require('../config/index.js');
const User =require( '../models/user.model.js') 
const ROLES=require("../roles");

const { JWT_SECRET } = config;

const SUPER_ADMIN=0;
const ADMIN_ONE=1;
const ADMIN_TWO=2;
//SUPER_ADMIN has all access
const ROLE_AUTH={
  [SUPER_ADMIN]:{
    roles:{
      "all":true
    }
  },
  [ADMIN_ONE]:{
    roles:{
      [ROLES[0]]:true
    }
  },
  [ADMIN_TWO]:{
    roles:{
      [ROLES[1]]:true
    }
  },

}

// User.find().then((data)=>{
//   data.forEach((doc)=>{
//     console.log(doc)
//   })
// })
    // User.findOneAndUpdate({_id:"60cc98c9e585c21d212ec082"},{admin_type:0}).then((doc)=>{console.log(doc)})

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
              console.log(role,'role',ROLE_AUTH[user.admin_type].roles[role])
              if((user && ROLE_AUTH[user.admin_type].roles[role]) || ROLE_AUTH[user.admin_type].roles["all"]){
                return next()
              }
              res.sendStatus(401) 
          }
          return inner;
      }

    }
module.exports = auth;