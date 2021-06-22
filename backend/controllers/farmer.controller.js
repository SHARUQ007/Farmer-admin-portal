const Farmer = require('../models/farmer.model')    

const farmersSerializer = data => ({
    id: data.id,
    name: data.name,
    phone: data.phone,
    aadhar: data.aadhar,
    address: data.address,
    landCapacity: data.landCapacity,
    status: data.status,
    date: data.date,
   
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Farmer.find()
    .then(async data => {
        const farmers = await Promise.all(data.map(farmersSerializer));
        res.send(farmers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving farmer Details."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 4, name = "", category = "all" } = req.query;

    let query = {}
    if (category && category.toLowerCase() !== "all") {
        query =  { category : category }
        
        if (name && name.trim() !== "") {
            query = {
                $and: [ { category : category } , { name: new RegExp(`${name}+`, "i") } ]
            }
        }
    }
    else if (name && name.trim() !== "") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await Farmer.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const farmers = await Promise.all(docs.map(farmersSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, farmers });
};

exports.findOne = (req, res) => {
    Farmer.find({name:req.query.name,phone:req.query.phone})
        .then(async data => {
            if(!data) {
                return res.status(404).send({
                    message: "farmer not found with id " + req.params.id
                });
            }
            const farmer = await Promise.all(data.map(farmersSerializer));
            res.send(farmer);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Farmer not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving farmer with id "+err + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name) {
         return res.status(400).send({
             message: "Farmer name can not be empty"
         });
    }

    const farmer = new Farmer({

        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        aadahar: req.body.aadhar.trim(),
        address: req.body.address.trim(),
        landCapacity: req.body.landCapacity.trim(),
        status: req.body.status.trim(),
        date : req.body.date.trim(),

      
    });

    farmer.save()
    .then(data => {
        const farmer = farmersSerializer(data)
        res.send(farmer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Farmer."
        });
    });
};

exports.update = (req, res) => {
    console.log(req.body,"hxhh")
    if(!req.body.name) {
        return res.status(400).send({
            message: "Farmer name can not be empty"
        });
    }

    Farmer.findByIdAndUpdate(req.params.id, {
       
        status: req.body.status.trim()
     
       
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Farmer not found with id " + req.params.id
            });
        }
        const farmer = farmersSerializer(data)
        res.send(farmer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Farmer not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating farmer with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Farmer.findByIdAndRemove(req.params.id)
     .then(farmer => {
         if(!farmer) {
             return res.status(404).send({
                 message: "Farmer not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Farmer deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Farmer not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete farmer with id " + req.params.id
         });
     });
};
