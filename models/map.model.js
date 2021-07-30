const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt= require("bcryptjs");

const MapSchema = mongoose.Schema({
  name: { type: String, 'default': '' },
  mobile: { type: String, 'default': '' },
  password: { type: String, 'default': '' },
  status: { type: String, 'default': 'active' },
  weightOfTruck:{type:Number},
  number: { type: String, 'default': '' },
  capacity: { type: Number, 'default': '' },
  password: { type: String, 'default': '' },
  address: { type: String, 'default': '' },
  city: { type: String, 'default': '' },
  location:{type:Object,'default': {lat:'',log:''} }

}, {
  timestamps: true
});

MapSchema.plugin(mongoosePaginate);

MapSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
MapSchema.pre("save", function (next) {

  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

module.exports = mongoose.model('Map', MapSchema);
