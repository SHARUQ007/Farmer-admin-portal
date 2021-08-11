const mongoose = require("mongoose");

const masterDMtransporterfarmerSchema = new mongoose.Schema({
  transporterid:{
    type:ObjectId,
    ref:"Map"
  }
});

const MasterDMtransporterfarmer = mongoose.model("MasterDMtransporterfarmer", masterDMtransporterfarmerSchema);

module.exports = MasterDMtransporterfarmer;