const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FarmerSchema = mongoose.Schema({
  name: { type: String, 'default': '' },
  phone: { type: String, 'default': '' },
  aadhar: { type: String, 'default': '' },
  address: { type: String, 'default': '' },
  landCapacity: { type: Number, 'default': '' },
  status: { type: String, 'default': '' },
  date: { type: Date, 'default': '' },

  
}, {
  timestamps: true
});

FarmerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', FarmerSchema);
