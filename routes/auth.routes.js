const { Router } = require( "express");

const authController = require( '../controllers/auth.controller.js');
const authRouter = Router();

const auth =require('../middleware/auth.js');
const ROLES="SUPER_ROLES";

authRouter.post('/login', authController.login);
// authRouter.post('/register',auth.isAuthenticatedAdmin,auth.hasPermission(ROLES),authController.register);

module.exports  =  authRouter;