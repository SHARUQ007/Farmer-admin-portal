const TransporterData = require('../models/transporterData.model')    
const Transporter =require('../models/map.model');

// id=["60ef0c0cd8e45e29425d30fb","60ef0c0cd8e45e29425d30fa","60ef0c0dd8e45e29425d30fc"," 60ef0c0cd8e45e29425d30f9"]
// TransporterData.find({}).then(data=>{
//     data.forEach(datas=>{
//         if(id.includes(String(datas._id))){
//             console.log(datas._id)
//             TransporterData.findOneAndUpdate({_id:datas._id},{scheduleDate:null}).then(d=>{console.log(d)})

//         }
// })
// })
const transporterDataSerializer = data => ({
   id: data.id,
   transporter_id:data.transporter_id,
   truckDrivername:data.truckDrivername,
   Farmername:data.allocatedFarmername,   
   truckDrivermobile:data.truckDrivermobile,
   stems:data.stems,
   status:data.status?data.status:"Pending",   
   truckNumber:data.truckNumber,
   scheduleDate:data.scheduleDate,
});

// Retrieve all data
exports.findAll =  (req, res) => {
    TransporterData.find()
    .then(async data => {
        const transporterData = await Promise.all(data.map(transporterDataSerializer));
        res.send(transporterData);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transporter Details."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 4} = req.query;

    let query = {}
    const paginated = await TransporterData.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    console.log(paginated)

    const transporterData = await Promise.all(docs.map(transporterDataSerializer));
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, transporterData });
};

exports.findFreeTransporter = (req, res) => {
    TransporterData.find({})
        .then(async data => {
            if(!data){
            res.json({freeTransporter:[]});
            }
            const transporter = await Promise.all(data.map(transporterDataSerializer));
            res.json({freeTransporter:data});
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "TransporterData not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving transporter with id "+err + req.params.id
            });
        });
};

exports.assignNewTransporter =async  (req, res) => {
    console.log(req.body,"hxhh")
    if(!req.body.id && req.body.transporter_id) {
        return res.status(400).send({
            message: "TransporterData status can not be empty"
        });
    }
    try{
        let transporter=await Transporter.findById(req.body.transporter_id)
        if(transporter){
            let transporterData=await TransporterData.findById(req.body.id)
            if(transporterData){
                let newTransporterData= await TransporterData.create({
                        transporter_id:transporter._id,
                        truckDrivername:transporter.name,
                        truckDrivermobile:transporter.mobile,
                        truckNumber:transporterData.truckNumber,
                        allocatedFarmername:transporterData.allocatedFarmername,
                        scheduleDate:transporterData.scheduleDate,
                        truckStartTime:transporterData.truckStartTime,
                        truckArrivalTime:transporterData.truckArrivalTime,
                        stems:transporterData.stems,
                        stemLoadingTime:transporterData.stemLoadingTime,
                        typeOfFarming:transporterData.typeOfFarming,
                        varietyOfStem:transporterData.varietyOfStem,
                        status:"Pending"    
                 })
                if(newTransporterData){
                    console.log(newTransporterData)
                    res.json({status:"success",message:"successfully assiged new transporter"})
                }
                else{
                    res.status(500).json({status:"failed",message:"sorry something went wrong"})
                }
            }
            else{
                    res.status(404).json({status:"failed",message:"No transporter Data find with id"})
            }
        }
        else{
                    res.status(404).json({status:"failed",message:"No transporter find with id"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({status:"failed",message:"sorry something went wrong"})
    }
};

exports.delete = (req, res) => {
  TransporterData.findByIdAndRemove(req.params.id)
     .then(transporter => {
         if(!transporter) {
             return res.status(404).send({
                 message: "TransporterData not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "TransporterData deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "TransporterData not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete transporter with id " + req.params.id
         });
     });
};

exports.getFilteredStem=async (req,res)=>{
     try{
        console.log(req.body)
        const { page = 1, limit = 4} = req.query;
        let query={}
        
        //if admin set status for fillter
        if(req.body.status){
            query["status"]=req.body.status;
        }
        if(req.body.date ){
            //for time 
            let timeStrig="T00:00:00.000Z"
            let nextDay=new Date(req.body.date)
            nextDay.setDate(nextDay.getDate()+1)
            //filtering using today to nextday 
            query["scheduleDate"]={$gte:new Date(req.body.date+timeStrig),$lt:nextDay};
        }
       

        const paginated = await TransporterData.paginate(
            query,
            {
                page,
                limit,
                lean: true,
                sort: { updatedAt: "desc" }
            }
        )
        const { docs } = paginated;
        
        delete paginated["docs"];
        const meta = paginated ;
        const transporterData = transporterDataSerializer(paginated)

        return res.json({ meta, transporterData});
        
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({
                message: "Error while getting scheduled Stems " 
            });
    }

}