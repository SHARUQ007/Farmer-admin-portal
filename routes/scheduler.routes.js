const { Router } =require("express");
const schedulerRouter = Router();

const schedulerController = require('../controllers/scheduler.controller.js');
const auth =require('../middleware/auth.js');
const ROLES="SUPER_ROLES";


schedulerRouter.get('/scheduledFarmer',auth.isAuthenticatedAdmin, schedulerController.findScheduledFarmer);

schedulerRouter.get('/scheduledTransporter', auth.isAuthenticatedAdmin, schedulerController.findScheduledTransporter);

schedulerRouter.get('/NonScheduledTransporter', auth.isAuthenticatedAdmin, schedulerController.findNonScheduledTransporter);

schedulerRouter.get('/stemAvailability', auth.isAuthenticatedAdmin, schedulerController.findStemAvailability);

schedulerRouter.get('/inputParameter', auth.isAuthenticatedAdmin, schedulerController.findInputParameter);

schedulerRouter.post('/inputParameter', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES),schedulerController.updateInputParameter);

schedulerRouter.get('/hyperParameter', auth.isAuthenticatedAdmin, schedulerController.findHyperParameter);

schedulerRouter.post('/hyperParameter', auth.isAuthenticatedAdmin,auth.hasPermission(ROLES),schedulerController.updateHyperParameter);


module.exports = schedulerRouter;
