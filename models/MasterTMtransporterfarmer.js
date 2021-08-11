const mongoose = require("mongoose");

const masterTMtransporterfarmerSchema = new mongoose.Schema({
  transporterid:{
    type:ObjectId,
    ref:"Map"
  }
});

const MasterTMtransporterfarmer = mongoose.model("MasterTMtransporterfarmer", masterTMtransporterfarmerSchema);

module.exports = MasterTMtransporterfarmer;