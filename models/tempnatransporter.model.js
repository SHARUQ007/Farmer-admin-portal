const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { ObjectId,Number} = mongoose.Schema.Types;

const TempnatransporterSchema = new mongoose.Schema({
 
  truckId: {
      type:Number,
  },
  trucknumber:{
      type:String,
  },
  truckdrivername:{
      type:String,
  },
  
  truckdrivermobile:{
      type:String,
  },  
  truckcapacity:{
    type:Number,
  },
  scheduleDate:{
      type:String,
  },
 

 
});

TempnatransporterSchema.plugin(mongoosePaginate);

const Tempnatransporter = mongoose.model("Tempnatransporter", TempnatransporterSchema);

module.exports = Tempnatransporter;