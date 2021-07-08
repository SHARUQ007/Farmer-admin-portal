const { Router } = require( "express");
const mapRouter = Router();
const mapController = require('../controllers/map.controller.js');
const auth =require('../middleware/auth.js');
const ROLES="TRANSPORTER_ROLES"

// Retrieve All data
mapRouter.get('/list', auth.isAuthenticatedAdmin, mapController.findAll);

// Retrieve data with pagination
mapRouter.get('/', auth.isAuthenticatedAdmin, mapController.findPagination);

// Find one by ID
mapRouter.get('/:id', auth.isAuthenticatedAdmin, mapController.findOne);

// Create
mapRouter.post('/', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES),mapController.create);

// Update
mapRouter.put('/:id', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES), mapController.update);

// Delete
mapRouter.delete('/:id', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES),mapController.delete);

module.exports = mapRouter;
