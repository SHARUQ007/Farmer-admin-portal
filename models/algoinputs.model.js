const mongoose = require("mongoose");

const algoinputSchema = new mongoose.Schema({
    DailyDemandRequirement:{
        type:Number,
    },
    MaximumAllowance:{
        type:Number,
    },
    ExcessstemsReceived:{
        type:Number,
    },
    CurrentDate:{
        type:String,
    },
    SchedulingAfter:{
        type:Number,
    },
    WeightofBananaStem:{
        type:Number,
    },
    MaximumTruckLoadingCapacity:{
        type:Number,
    },
    TruckStartTime:{
        type:String,
    },
    LoadingTimeperStem:{
        type:Number,
    },
    DatePenaltyValue:{
        type:Number
    },
    PriorityPenaltyValue:{
        type:Number,
    },
    ScheduleDate:{
        type:String,
    },

});

const Algoinput = mongoose.model("Algoinput", algoinputSchema);
module.exports = Algoinput;