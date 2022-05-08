const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const { ObjectId,Number} = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  userid:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  image:{
    type:String,
    default:null
  },
  orderId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  noOfStems: {
    type: Number,
    required: true,
  },
  remainingStems: {
    type: Number,
    required: true,
  },
  landCapacity: {
    type: Number,
    required: true,
  },
  expected: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  pincode: {
    type: String,
  },
  status: {
    type: String,
  },
  priority: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  farming:{
    type:String,
    required:true,
  },
  scheduledDate:{
    type:Date
  },
  variety:{
    type:String,
    required:true
  }
 
});

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
