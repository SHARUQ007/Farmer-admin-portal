const { Router } = require( "express");
const ordersRouter = Router();
const ordersController = require('../controllers/orders.controller.js');
const auth =require('../middleware/auth.js');
const ROLES=["STEM_ROLES","SCHEDULED_STEM_ROLES"];

// Retrieve All data
ordersRouter.get('/list',auth.isAuthenticatedAdmin,ordersController.findAll);

// Retrieve data with pagination
ordersRouter.get('/', auth.isAuthenticatedAdmin, ordersController.findPagination);

//return ScheduledStem 
//not dont change the order of route
ordersRouter.get('/scheduledStem',auth.isAuthenticatedAdmin,ordersController.getScheduledStem);

//to get filtered stem data

ordersRouter.post('/scheduledStem', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[1]), ordersController.getFilteredStem);


ordersRouter.post('/scheduleDate', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[1]), ordersController.updateScheduledDate);

// Find one by ID
ordersRouter.get('/:id', auth.isAuthenticatedAdmin, ordersController.findOne);

// Create
ordersRouter.post('/',auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[0]), ordersController.create);

// Update
ordersRouter.put('/:id', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES[0]),ordersController.update);

// Delete
ordersRouter.delete('/:id', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES[0]), ordersController.delete);


module.exports = ordersRouter;
