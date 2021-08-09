const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { ObjectId,Number} = mongoose.Schema.Types;

const TemptransportersoutputSchema = new mongoose.Schema({
 
  truckId: {
      type:Number
  },
  trucknumber:{
      type:String
  },
  truckdrivername:{
      type:String
  },
  truckcapacity:{
    type:Number
  },
  allocatedFarmerId:{
      type:Number,
  },
  allocatedFarmerTransactionId:{
      type:String,
  },
  allocatedFarmerName:{
      type:String,
  },
  scheduleDate:{
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
  varietyOfStem:{
      type:String,
  },
 
});

orderSchema.plugin(mongoosePaginate);

const Temptransportersoutput = mongoose.model("Temptransportersoutput", orderSchema);

module.exports = Temptransportersoutput;