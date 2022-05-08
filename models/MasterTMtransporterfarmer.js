const mongoose = require("mongoose");
const { ObjectId} = mongoose.Schema.Types;

const masterTMtransporterfarmerSchema = new mongoose.Schema({
  transporterid:{
    type:ObjectId,
    ref:"Map"
  },
  any:{}
});

const MasterTMtransporterfarmer = mongoose.model("Mastertmtransporterfarmer", masterTMtransporterfarmerSchema);

module.exports = MasterTMtransporterfarmer;