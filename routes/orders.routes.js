const jwt = require( '../middleware/auth.js');
const { Router } = require( "express");
const ordersRouter = Router();
const ordersController = require('../controllers/orders.controller.js');

// Retrieve All data
ordersRouter.get('/list', jwt, ordersController.findAll);

// Retrieve data with pagination
ordersRouter.get('/', jwt, ordersController.findPagination);

//return ScheduledStem 
//not dont change the order of route
ordersRouter.get('/scheduledStem', jwt, ordersController.getScheduledStem);

//to get filtered stem data

ordersRouter.post('/scheduledStem', jwt, ordersController.getFilteredStem);


ordersRouter.post('/scheduleDate', jwt, ordersController.updateScheduledDate);

// Find one by ID
ordersRouter.get('/:id', jwt, ordersController.findOne);

// Create
ordersRouter.post('/', jwt, ordersController.create);


// Update
ordersRouter.put('/:id', jwt, ordersController.update);


// Delete
ordersRouter.delete('/:id', jwt, ordersController.delete);


module.exports = ordersRouter;
