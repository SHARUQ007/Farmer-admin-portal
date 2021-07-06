const { Router } = require( "express");
const ordersRouter = Router();
const ordersController = require('../controllers/orders.controller.js');
const auth =require('../middleware/auth.js');
const ROLES=require("../roles");

// Retrieve All data
ordersRouter.get('/list',auth.isAuthenticatedAdmin,ordersController.findAll);

// Retrieve data with pagination
ordersRouter.get('/', auth.isAuthenticatedAdmin, ordersController.findPagination);

//return ScheduledStem 
//not dont change the order of route
ordersRouter.get('/scheduledStem',auth.isAuthenticatedAdmin,ordersController.getScheduledStem);

//to get filtered stem data

ordersRouter.post('/scheduledStem', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[0]), ordersController.getFilteredStem);


ordersRouter.post('/scheduleDate', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[1]), ordersController.updateScheduledDate);

// Find one by ID
ordersRouter.get('/:id', auth.isAuthenticatedAdmin, ordersController.findOne);

// Create
ordersRouter.post('/', auth.isAuthenticatedAdmin, ordersController.create);


// Update
ordersRouter.put('/:id', auth.isAuthenticatedAdmin, ordersController.update);


// Delete
ordersRouter.delete('/:id', auth.isAuthenticatedAdmin, ordersController.delete);


module.exports = ordersRouter;
