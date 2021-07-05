const { Schema, model } =require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  admin_type:{
    type:Number
  }
}, {
  timestamps: true
});

UserSchema.plugin(mongoosePaginate);
const User = model('admin', UserSchema);

module.exports =User;
