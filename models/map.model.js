const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MapSchema = mongoose.Schema({
  name: { type: String, 'default': '' },
  mobile: { type: String, 'default': '' },
  password: { type: String, 'default': '' },
  number: { type: String, 'default': '' },
  capacity: { type: String, 'default': '' },

  
}, {
  timestamps: true
});

MapSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Map', MapSchema);
