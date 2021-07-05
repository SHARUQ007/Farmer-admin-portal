const {isAuthenticatedAdmin} =require('../middleware/auth.js');
const { Router } = require( "express");
const mapRouter = Router();
const mapController = require('../controllers/map.controller.js');

// Retrieve All data
mapRouter.get('/list', isAuthenticatedAdmin, mapController.findAll);

// Retrieve data with pagination
mapRouter.get('/', isAuthenticatedAdmin, mapController.findPagination);

// Find one by ID
mapRouter.get('/:id', isAuthenticatedAdmin, mapController.findOne);

// Create
mapRouter.post('/', isAuthenticatedAdmin, mapController.create);

// Update
mapRouter.put('/:id', isAuthenticatedAdmin, mapController.update);

// Delete
mapRouter.delete('/:id', isAuthenticatedAdmin, mapController.delete);

module.exports = mapRouter;
