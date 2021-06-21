const jwt =require('../middleware/auth.js');
const { Router } =require("express");
const farmerRouter = Router();
const farmerController = require('../controllers/farmer.controller.js');

// Retrieve All data
farmerRouter.get('/list', jwt, farmerController.findAll);

// Retrieve data with pagination
farmerRouter.get('/', jwt, farmerController.findPagination);

// Find one by ID
farmerRouter.get('/:id', jwt, farmerController.findOne);

// Create
farmerRouter.post('/', jwt, farmerController.create);

// Update
farmerRouter.put('/:id', jwt, farmerController.update);

// Delete
farmerRouter.delete('/:id', jwt, farmerController.delete);

module.exports = farmerRouter;
