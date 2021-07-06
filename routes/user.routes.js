const { Router } =require( "express");
const userRouter = Router();
const userController = require('../controllers/user.controller.js');
const auth =require('../middleware/auth.js');
const ROLES=require("../roles");
// Retrieve All data
userRouter.get('/list',auth.isAuthenticatedAdmin, userController.findAll);

// Retrieve data with pagination
userRouter.get('/', auth.isAuthenticatedAdmin, userController.findPagination);

// Find one by ID
userRouter.get('/:id', auth.isAuthenticatedAdmin, userController.findOne);

// Create
userRouter.post('/', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[4]), userController.create);

// Update
userRouter.put('/:id', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[2]), userController.update);

// Delete
userRouter.delete('/:id', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[3]), userController.delete);

module.exports = userRouter;
