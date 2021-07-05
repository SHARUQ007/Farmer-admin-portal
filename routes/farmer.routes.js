const { Router } =require("express");
const farmerRouter = Router();
const farmerController = require('../controllers/farmer.controller.js');
const auth =require('../middleware/auth.js');
const ROLES=require("../roles");


// Retrieve All data
farmerRouter.get('/list',auth.isAuthenticatedAdmin, farmerController.findAll);

// Retrieve data with pagination
farmerRouter.get('/', auth.isAuthenticatedAdmin, farmerController.findPagination);

// Find one by ID
farmerRouter.get('/get/', auth.isAuthenticatedAdmin, farmerController.findOne);

// Create
farmerRouter.post('/', auth.isAuthenticatedAdmin, farmerController.create);

// Update status
farmerRouter.put('/:id', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES[0]),farmerController.update);

// Delete
farmerRouter.delete('/:id', auth.isAuthenticatedAdmin, farmerController.delete);

module.exports = farmerRouter;
