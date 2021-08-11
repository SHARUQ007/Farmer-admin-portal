const tempFarmerOutputs =require('../models/tempfarmeroutputs.model');
const tempNaTransporter =require('../models/tempnatransporter.model');
const tempTransoprtersOutputs=require('../models/temptransportersoutputs.model');
const transporterData =require('../models/transporterData.model');
const Orders =require('../models/orders.model');


const algoInputs =require('../models/algoinputs.model');
// tempTransoprtersOutputs.find({}).then(a=>console.log(a))
const transporterDataSerializer = data => ({
   trucknumber:data.trucknumber,
   truckDrivername:data.truckDrivername,
   Farmername:data.allocatedFarmername,   
   allocatedFarmerId:data.allocatedFarmerId,
   stems:data.stems,
   typeOfFarming:data.typeOfFarming,   
   truckNumber:data.truckNumber,
   stemLoadingTime:data.stemLoadingTime,
});


const nonScheduledTransporterSerializer = data => ({
   trucknumber:data.trucknumber,
   truckDrivername:data.truckdrivername,
   truckdrivermobile:data.truckdrivermobile,   
   truckcapacity:data.truckcapacity,
});

const scheduledFarmerSerializer = data => ({
   name:data.name,
   truckDrivername:data.truckDrivername,
   transactionId:data.transactionId,   
   scheduleDate:data.scheduleDate,
   scheduledStems:data.scheduledStems,
   farming:data.farming,   
   truckNumber:data.truckNumber,
   variety:data.variety,
});


const inputParameterSerializer = data => ({
    id:data._id,
    CurrentDate:data.CurrentDate, 
    DailyDemandRequirement:data.DailyDemandRequirement,
    MaximumAllowance:data.MaximumAllowance,
    WeightofBananaStem:data.WeightofBananaStem,
    LoadingTimeperStem:data.LoadingTimeperStem,
    MaximumTruckLoadingCapacity:data.MaximumTruckLoadingCapacity,
    TruckStartTime:data.TruckStartTime,
    SchedulingAfter:data.SchedulingAfter
});

const hyperParameterSerializer = data => ({
    id:data._id,
    DatePenaltyValue:data.DatePenaltyValue,
    PriorityPenaltyValue:data.PriorityPenaltyValue,
    ExcessstemsReceived:data.ExcessstemsReceived
});

const stemAvailabilitySerializer=data=>({
    name:data._name,
    transactionId:data.transactionId, 
    scheduleDate:data.scheduleDate,
    scheduledStems:data.scheduledStems,
    farming:data.farming,
    variety:data.variety,
})
//algoInputs.find({}).then((A)=>console.log(A))
// Retrieve data with pagination
exports.findScheduledFarmer = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={}    
    const paginated = await tempFarmerOutputs.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const scheduledFarmer =  await Promise.all(docs.map(scheduledFarmerSerializer));
    delete paginated["docs"];
    const meta = paginated

    res.json({scheduledFarmer, meta});
};

// Retrieve data with pagination
exports.findScheduledTransporter = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={}
    const paginated = await tempTransoprtersOutputs.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const scheduledTransporter = [...docs]
    delete paginated["docs"];
    const meta = paginated

    res.json({ scheduledTransporter,meta});
};

// Retrieve data with pagination
exports.findNonScheduledTransporter = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={}
    const paginated = await tempNaTransporter.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const nonScheduledTransporter =  await Promise.all(docs.map(nonScheduledTransporterSerializer));
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, nonScheduledTransporter });
};

// Retrieve data with pagination
exports.findStemAvailability = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={status:"Recieved"}
    const paginated = await Orders.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const  stemAvailability =  await Promise.all(docs.map(stemAvailabilitySerializer));
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, stemAvailability});
};

exports.findInputParameter = async (req, res) => {
    
    try{
            let  inputParams=await algoInputs.findOne({});
            inputParams= inputParameterSerializer(inputParams);
            res.json({inputParams})
    }
    catch(err){
            console.log(err)
            return res.status(500).send({
                message: "Error retrieving input parameter"
            });
    }
}


exports.updateInputParameter= (req, res) => {
   if(req.body.id){
        algoInputs.findOneAndUpdate({_id:req.body.id},{
                CurrentDate:req.body.CurrentDate, 
                DailyDemandRequirement:req.body.DailyDemandRequirement,
                MaximumAllowance:req.body.MaximumAllowance,
                WeightofBananaStem:req.body.WeightofBananaStem,
                LoadingTimeperStem:req.body.LoadingTimeperStem,
                MaximumTruckLoadingCapacity:req.body.MaximumTruckLoadingCapacity,
                TruckStartTime:req.body.TruckStartTime,
                SchedulingAfter:req.body.SchedulingAfter
        })
        .then((data)=>{
            if(data){
                 return res.status(200).send({
                    message: "Successfully updated"
                });
            }
            else{
                 return res.status(500).send({
                    message: "Failed to updateInputParameter"
                });
            }
        })
        .catch((e)=>{
            return res.status(500).send({
                    message: "Failed to updateInputParameter"
                });
        })
   }
   else{
     return res.status(500).send({
                    message: "No Id provided"
                });
   }
}

exports.findHyperParameter = async (req, res) => {
   try{
            let  hyperParams=await algoInputs.findOne({});
            hyperParams= hyperParameterSerializer(hyperParams);
            res.json({hyperParams})
    }
    catch(err){
            console.log(err)
            return res.status(500).send({
                message: "Error retrieving input parameter"
            });
    }
}

exports.updateHyperParameter= (req, res) => {
      if(req.body.id){
        algoInputs.findOneAndUpdate({_id:req.body.id},{
            DatePenaltyValue:req.body.DatePenaltyValue,
            PriorityPenaltyValue:req.body.PriorityPenaltyValue,
            ExcessstemsReceived:req.body.ExcessstemsReceived
        })
        .then((data)=>{
            if(data){
                 return res.status(200).send({
                    message: "Successfully updated"
                });
            }
            else{
                 return res.status(500).send({
                    message: "Failed to updateInputParameter"
                });
            }
        })
        .catch((e)=>{
            return res.status(500).send({
                    message: "Failed to updateInputParameter"
                });
        })
   }
   else{
     return res.status(500).send({
                    message: "No Id provided"
                });
   }
    
};