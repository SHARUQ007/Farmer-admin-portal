const { Schema, model } =require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema
const OrdersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: Number,
    required: true
  },
  noOfStems: {
    type: Number,
    required:true
  },
  status: {
    type: String,
    required:true
  },
  farming: {
    type: String,
    required:true
  },
  variety: {
    type: String,
    required:true
  },
   scheduledDate:{
    type:Date
   },
   date:{
     type:Date
   },
   remainingStems:{
     type:Number
   },
   expected:{
     type:Date
   },
   pincode:{
     type:String
   },
   scheduledStems:{
     type:Number
   },
   scheduledNumberofTrucks:{
     type:Number
   },
   truckNumber: {
     type:Array
   },  
  truckDrivername: {
     type:Array
   },
   stemsLoadedforTruck:{
     type:Array
   },
   arrivalTimeofTrucks:{
     type:Array
   },
   stemLoadingTimeforTrucks:{
     type:Array
   },
}, {
  timestamps: true
});

OrdersSchema.plugin(mongoosePaginate);
const Orders = model('orders', OrdersSchema);

module.exports =Orders;
