const { Schema, model } =require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema
const OrdersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
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
  }
}, {
  timestamps: true
});

OrdersSchema.plugin(mongoosePaginate);
const Orders = model('orders', OrdersSchema);

module.exports =Orders;
