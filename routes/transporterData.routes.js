const { Router } =require("express");
const transporterDataRouter = Router();
const transporterDataController = require('../controllers/transporterData.controller.js');
const auth =require('../middleware/auth.js');
const ROLES="FARMER_ROLES"


// Retrieve All data
transporterDataRouter.get('/list',auth.isAuthenticatedAdmin, transporterDataController.findAll);

// Retrieve data with pagination
transporterDataRouter.get('/', auth.isAuthenticatedAdmin, transporterDataController.findPagination);

//to get filtered stem data

transporterDataRouter.post('/', auth.isAuthenticatedAdmin,transporterDataController.getFilteredStem);

// Find one by ID
transporterDataRouter.get('/fetchFreeTransporter', auth.isAuthenticatedAdmin, transporterDataController.findFreeTransporter);


// Update status
transporterDataRouter.put('/:id', auth.isAuthenticatedAdmin, auth.hasPermission(ROLES),transporterDataController.update);

transporterDataRouter.post('/assignNewTransporter', auth.isAuthenticatedAdmin,transporterDataController.assignNewTransporter);

// Delete
transporterDataRouter.delete('/:id', auth.isAuthenticatedAdmin,  auth.hasPermission(ROLES),transporterDataController.delete);

transporterDataRouter.get('/download/', auth.isAuthenticatedAdmin, transporterDataController.sendJSON);

module.exports = transporterDataRouter;
