const Map =require('../models/map.model');

const mapsSerializer = data => ({
    id: data.id,
    name: data.name,
    mobile: data.mobile,
    password: data.password,
    number: data.number,
    capacity: data.capacity,
   
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Map.find()
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

    const paginated = await Map.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const maps = await Promise.all(docs.map(mapsSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, maps });
};

exports.findOne = (req, res) => {
    Map.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "map not found with id " + req.params.id
                });
            }
            const map = mapsSerializer(data)
            res.send(map);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Map not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving map with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name) {
         return res.status(400).send({
             message: "Map name can not be empty"
         });
    }

    const map = new Map({
        name: req.body.name.trim(),
        mobile: req.body.mobile.trim(),
        number: req.body.number.trim(),
        capacity: req.body.capacity.trim(),
        password: req.body.password.trim(),
      
    });

    map.save()
    .then(data => {
        const map = mapsSerializer(data)
        res.send(map);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Map."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Map name can not be empty"
        });
    }

    Map.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        mobile: req.body.mobile.trim(),
        number: req.body.number.trim(),
        capacity: req.body.capacity.trim(),
        password: req.body.password.trim(),
       
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Map not found with id " + req.params.id
            });
        }
        const map = mapsSerializer(data)
        res.send(map);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Map not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating map with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Map.findByIdAndRemove(req.params.id)
     .then(map => {
         if(!map) {
             return res.status(404).send({
                 message: "Map not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Map deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Map not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete map with id " + req.params.id
         });
     });
};
