const Orders =require('../models/orders.model');
const fs = require('fs');
const path =require('path');
const ordersSerializer = data => ({
    id: data.id,
    name: data.name,
    phone: data.phone,
    orderId: data.orderId,
    noOfStems: data.noOfStems,
    status: data.status,
    farming: data.farming,
    variety: data.variety,
    expected:data.expected,
    image:data.image?data.image:""
});
const popupOrdersSerializer = data => ({
    id: data.id,
    active: data.active,
    landCapacity: data.landCapacity,
    pincode: data.pincode,
    scheduledStems: data.scheduledStems,
    scheduledDate: data.scheduledDate,
    TruckId: data.TruckId,
    StemsLoadedforTruck: data.StemsLoadedforTruck,
    ArrivalTimeofTrucks: data.ArrivalTimeofTrucks,
    StemLoadingTimeforTrucks:data.StemLoadingTimeforTrucks
});

exports.getOrderPicture=(req, res) =>{
  if(req.app.locals.gfs){
        req.app.locals.gfs.files.findOne({
          filename: req.params.imageName
        }, (err, file) => {
          if (!file || file.length === 0) return res.status(404).json({
            err: 'No file exists'
          });
          if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
            const readstream = req.app.locals.gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({
              err: 'Not an image'
            });
          }

      });
  }else{
    res.status(404).json({
              err: 'Not an image'
            });
  }
}
// Retrieve all data
exports.findAll =  (req, res) => {

    Orders.find()
    .then(async data => {
        const orders = await Promise.all(data.map(ordersSerializer));
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={}
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
    const orders = await Promise.all(docs.map(ordersSerializer));
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, orders });
};

exports.findOne = async (req, res) => {
    const { page = 1, limit = 4} = req.query;
    let query={name:req.query.name,phone:req.query.phone}
    try{
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
            
            const orders = await Promise.all(docs.map(ordersSerializer));
            delete paginated["docs"];
            const meta = paginated
            res.json({ meta, orders });
    }
    catch(err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Orders not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving orders with id " + req.params.id
            });
    }
}

exports.create = (req, res) => {
    if(!req.body.name) {
         return res.status(400).send({
             message: "Orders name can not be empty"
         });
    }

    const orders = new Orders({
        name:req.body.name.trim(),
        phone:req.body.phone.trim(),
        orderId:req.body.orderId.trim(),
        noOfStems:req.body.noOfStems.trim(),
        status:req.body.status.trim(),
        farming:req.body.farming.trim(),
        variety:req.body.variety.trim(),
    });

    orders.save()
    .then(data => {
        const orders = ordersSerializer(data)
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Orders."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Orders name can not be empty"
        });
    }
    Orders.findByIdAndUpdate(req.params.id, {
        status:req.body.status.trim(),
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.id
            });
        }
        const orders = ordersSerializer(data)
        res.send({status:"success"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating orders with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Orders.findByIdAndRemove(req.params.id)
     .then(orders => {
         if(!orders) {
             return res.status(404).send({
                 message: "Orders not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Orders deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Orders not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete orders with id " + req.params.id
         });
     });
};

exports.getScheduledStem=async (req,res)=>{
     try{
        const { page = 1, limit = 4} = req.query;
        //return collection that has scheduled stems greater then zero
        let query={scheduledStems:{$gt:0}}
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
        const orders = await Promise.all(docs.map(ordersSerializer));
        //Serializing the data that need to show in frontend on popup
        const popupData = await Promise.all(docs.map(popupOrdersSerializer));
        delete paginated["docs"];
        const meta = paginated  
        res.json({ meta, orders ,popupData});
    }
    catch(err){
        res.status(500).send({
                message: "Error while getting scheduled Stems " 
            });
    }

}
exports.getFilteredStem=async (req,res)=>{
     try{
        const { page = 1, limit = 4} = req.query;
        let query={}
        //if we want scheduled stems
        if(req.body.isScheduledStems){
              query["scheduledStems"]={$gt:0}
        }
        //if admin set status for fillter
        if(req.body.status){
            query["status"]=req.body.status;
        }
        //if it has date and it is scheduled stem use scheduled date to filter
        if(req.body.date && req.body.isScheduledStems){
            //for time 
            let timeStrig="T00:00:00.000Z"
            let nextDay=new Date(req.body.date)
            nextDay.setDate(nextDay.getDate()+1)
            //filtering using today to nextday 
            query["scheduledDate"]={$gte:new Date(req.body.date+timeStrig),$lt:nextDay};
        }
        //if it has date and it is order use expected date to filter
        if(req.body.date && !req.body.isScheduledStems){
            //for time 
            let timeStrig="T00:00:00.000Z"
            let nextDay=new Date(req.body.date)
            nextDay.setDate(nextDay.getDate()+1)
            //filtering using today to nextday 
            query["expected"]={$gte:new Date(req.body.date+timeStrig),$lt:nextDay};
        }

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
        const orders = await Promise.all(docs.map(ordersSerializer));
        //if it scheduled stem only send popUp data else don't
        if(req.body.isScheduledStems){
            //Serializing the data that need to show in frontend on popup 
            //dont chnage this var to const it cause error
             var popupData = await Promise.all(docs.map(popupOrdersSerializer));
        }
        delete paginated["docs"];
        const meta = paginated  ;
        //if it scheduled stem only send popUp data else don't
        if(req.body.isScheduledStems){
            return res.json({ meta, orders ,popupData});
        }else{
            return res.json({ meta,orders});

        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({
                message: "Error while getting scheduled Stems " 
            });
    }

}

exports.updateScheduledDate=async (req,res)=>{
     if(!req.body.id) {
        return res.status(400).send({
            message: "Orders id can not be empty"
        });
    }
    Orders.findByIdAndUpdate({_id:req.body.id}, {
        scheduledDate:new Date(req.body.date),
        status:"Scheduled",    
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.id
            });
        }
        // const orders = ordersSerializer(data);
        // const popupData = popupOrdersSerializer(data);
        res.json({status:"success"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating orders with id " + req.params.id
        });
    });
};
    
exports.sendJSON = (req, res) => {
    let stream = fs.createWriteStream(path.join(__dirname, "../../stemAvaliblityData.json"));
    console.log("lkjhgfdfghj")
   Orders.find({})
        .then(async orders => {
            if(!orders) {  
                return res.status(404).send({
                    message: "Orders not found"
                });
            }
            res.set({
              'Content-Type': 'application/json',
            })
            orders.forEach(order=>{
                stream.write(JSON.stringify(order),()=>{
                    res.download(path.join(__dirname, "../../stemAvaliblityData.json"),"stemAvaliblityData.json",(err) => {
                            if (err) {
                                console.log("")
                            } else {
                                console.log('file downloaded')
                            }
                        }
                    )
                })
            });

        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Failed" 
                });
            }
            return res.status(500).send({
                message: "Error retrieving Orders "
            });
        });
};

exports.scheduledSendJSON = (req, res) => {
    let stream = fs.createWriteStream(path.join(__dirname, "../../scheduledStemAvaliblityData.json"));
   Orders.find({scheduledStems:{$gt:0}})
        .then(async orders => {
            if(!orders) {
                return res.status(404).send({
                    message: "Orders not found"
                });
            }
            res.set({
              'Content-Type': 'application/json',
            })
            orders.forEach(order=>{
                stream.write(JSON.stringify(order),()=>{
                    res.download(path.join(__dirname, "../../scheduledStemAvaliblityData.json"),"scheduledStemAvaliblityData.json",(err) => {
                            if (err) {
                                console.log("")
                            } else {
                                console.log('file downloaded')
                            }
                        }
                    )
                })
            });

        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Failed" 
                });
            }
            return res.status(500).send({
                message: "Error retrieving Orders "
            });
        });
};