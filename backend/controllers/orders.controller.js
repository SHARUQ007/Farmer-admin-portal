const Orders =require('../models/orders.model');

const ordersSerializer = data => ({
    id: data.id,
    name: data.name,
    phone: data.phone,
    orderId: data.orderId,
    noOfStems: data.noOfStems,
    status: data.status,
    farming: data.farming,
    variety: data.variety,
});

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

exports.findOne = (req, res) => {
    Orders.find({name:req.query.name,phone:req.query.phone})
        .then(async data => {
            if(!data) {
                return res.status(404).send({
                    message: "orders not found with id " + req.params.id
                });
            }
            const orders =await Promise.all(data.map(ordersSerializer));
            res.send(orders);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Orders not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving orders with id " + req.params.id
            });
        });
};

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
        // name:req.body.name.trim(),
        // phone:req.body.phone.trim(),
        // orderId:req.body.orderId.trim(),
        // noOfStems:req.body.noOfStems.trim(),
        status:req.body.status.trim(),
        // farming:req.body.farming.trim(),
        // variety:req.body.variety.trim(),       
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.id
            });
        }
        const orders = ordersSerializer(data)
        res.send(orders);
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
        delete paginated["docs"];
        const meta = paginated
        res.json({ meta, orders });
    }
    catch(err){
        res.status(500).send({
                message: "Error while getting scheduled Stems " 
            });
    }

}
