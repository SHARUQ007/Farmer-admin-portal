const Transporter =require('../models/map.model');

const mapsSerializer = data => ({
    id: data.id,
    name: data.name,
    mobile: data.mobile,
    password: data.password,
    number: data.number,
    status:data.status?data.status:"",
    capacity: data.capacity,
    city:data.city,
    address:data.address,
    location:data.location
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Transporter.find()
    .then(async data => {
        const maps = await Promise.all(data.map(mapsSerializer));
        res.send(maps);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving maps."
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
    const paginated = await Transporter.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    console.log(docs)
    const maps = await Promise.all(docs.map(mapsSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, maps });
};

exports.findOne = (req, res) => {
    Transporter.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "map not found with id " + req.params.id
                });
            }
            console.log(data)
            const map = mapsSerializer(data)
            res.send(map);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Transporter not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving map with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    console.log(req.body.location)
    if(!req.body.name) {
         return res.status(400).send({
             message: "Transporter name can not be empty"
         });
    }

    const map = new Transporter({
        name: req.body.name.trim(),
        mobile: req.body.mobile.trim(),
        number: req.body.number.trim(),
        status:req.body.status.trim(),
        capacity: req.body.capacity.trim(),
        password: req.body.password.trim(),
        city:req.body.city,
        address:req.body.address,
        location:{lat:req.body.location.lat,log:req.body.location.log}
    });

    map.save()
    .then(data => {
        console.log(data);
        const map = mapsSerializer(data)
        res.send(map);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transporter."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Transporter name can not be empty"
        });
    }

    Transporter.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        mobile: req.body.mobile.trim(),
        number: req.body.number.trim(),
        capacity: req.body.capacity.trim(),
        password: req.body.password.trim(),
       
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Transporter not found with id " + req.params.id
            });
        }
        const map = mapsSerializer(data)
        res.send(map);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transporter not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating map with id " + req.params.id
        });
    });
};

exports.updateStatus = (req, res) => {

    Transporter.findByIdAndUpdate(req.params.id, {
       status:req.body.status
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Transporter not found with id " + req.params.id
            });
        }
        const map = mapsSerializer(data)
        res.send(map);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transporter not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating map with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Transporter.findByIdAndRemove(req.params.id)
     .then(map => {
         if(!map) {
             return res.status(404).send({
                 message: "Transporter not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Transporter deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Transporter not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete map with id " + req.params.id
         });
     });
};
