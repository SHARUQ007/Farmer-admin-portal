const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { ObjectId} = mongoose.Schema.Types;

const transporterDataSchema = new mongoose.Schema({
  transporter_id:{
    type:ObjectId,
    ref:"Map"
  },
  truckNumber: {
    type: String, 
  },
  truckDrivername: {
    type: String,
  },
  truckDrivermobile: {
    type: Number
  },
  status:{
    type:String,
    default:"Pending"
  },
  allocatedFarmername: {
    type: String,
  },
  scheduleDate: {
      type:Date,
      default:null
  },
  truckStartTime: {
      type:String,
  },
  truckArrivalTime:{
    type:String,
  },
  stems:{
    type:Number,
  },
  stemLoadingTime:{
    type:String,
  },
  typeOfFarming:{
    type:String,
  },
   varietyOfStems: {
     type:String,
  },
  

});

transporterDataSchema.plugin(mongoosePaginate);

const Transporter = mongoose.model("Transporter", transporterDataSchema);

module.exports = Transporter;
