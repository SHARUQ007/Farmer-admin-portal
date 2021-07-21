const { Router } =require("express");
const farmerRouter = Router();
const farmerController = require('../controllers/farmer.controller.js');
const auth =require('../middleware/auth.js');
const ROLES="FARMER_ROLES"


// Retrieve All data
farmerRouter.get('/list',auth.isAuthenticatedAdmin, farmerController.findAll);

// Retrieve data with pagination
farmerRouter.get('/', auth.isAuthenticatedAdmin, farmerController.findPagination);

// Find one by ID
farmerRouter.get('/get/', auth.isAuthenticatedAdmin, farmerController.findOne);
//to get filtered status
farmerRouter.post('/get/', auth.isAuthenticatedAdmin, farmerController.filteredFarmer);

// Create
farmerRouter.post('/', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES),farmerController.create);

// Update status
farmerRouter.put('/:id', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES),farmerController.update);

// Delete
farmerRouter.delete('/:id', auth.isAuthenticatedAdmin,  auth.hasPermission(ROLES),farmerController.delete);

module.exports = farmerRouter;
