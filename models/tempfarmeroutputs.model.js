const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { ObjectId,Number} = mongoose.Schema.Types;

const TempfarmeroutputSchema = new mongoose.Schema({
 
  transactionId: {
      type:String,
  },
  name:{
      type:String,
  },
  scheduleDate:{
      type:String,
  },
  scheduledStems:{
      type:Number,
  },
  farming:{
      type:String,
  },
  variety:{
      type:String,
  },
  dbObjectiId:{
    type:ObjectId,
    ref:"dbObjectiId",
    
  },

 
});

orderSchema.plugin(mongoosePaginate);

const Tempfarmeroutput = mongoose.model("Tempfarmeroutput", orderSchema);

module.exports = Tempfarmeroutput;
