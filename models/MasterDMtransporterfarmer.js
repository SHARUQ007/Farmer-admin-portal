const mongoose = require("mongoose");

const { ObjectId} = mongoose.Schema.Types;

const masterDMtransporterfarmerSchema = new mongoose.Schema({
  transporterid:{
    type:ObjectId,
    ref:"Map"
  },
  any:{}
});

const MasterDMtransporterfarmer = mongoose.model("Masterdmtransporterfarmer", masterDMtransporterfarmerSchema);

module.exports = MasterDMtransporterfarmer;