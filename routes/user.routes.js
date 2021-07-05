const {isAuthenticatedAdmin} =require('../middleware/auth.js');
const { Router } =require( "express");
const userRouter = Router();
const userController = require('../controllers/user.controller.js');

// Retrieve All data
userRouter.get('/list',isAuthenticatedAdmin, userController.findAll);

// Retrieve data with pagination
userRouter.get('/', isAuthenticatedAdmin, userController.findPagination);

// Find one by ID
userRouter.get('/:id', isAuthenticatedAdmin, userController.findOne);

// Create
userRouter.post('/', isAuthenticatedAdmin, userController.create);

// Update
userRouter.put('/:id', isAuthenticatedAdmin, userController.update);

// Delete
userRouter.delete('/:id', isAuthenticatedAdmin, userController.delete);

module.exports = userRouter;
