const express =require('express');
const mongoose =require('mongoose');
const path =require('path');
const cors =require('cors');
const bodyParser =require('body-parser');
const morgan =require('morgan');
const Grid = require('gridfs-stream');
const config =require('./config/index.js');

// routes
const authRouter =require('./routes/auth.routes.js');
const mapRouter =require('./routes/map.routes.js');
const transporterDataRouter =require('./routes/transporterData.routes.js');
const userRouter =require('./routes/user.routes.js');
const farmerRouter =require('./routes/farmer.routes.js');
const ordersRouter =require('./routes/orders.routes.js');
const schedulerRouter =require('./routes/scheduler.routes.js');


const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}`;
console.log("db", db)
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

/*Mongoose's findOneAndUpdate() long pre-dates the MongoDB driver's findOneAndUpdate() 
  function,so it uses the MongoDB driver's findAndModify() function instead.
  You can opt in to using the MongoDB driver's findOneAndUpdate() function
  using the useFindAndModify global option.*/
  
mongoose.set('useFindAndModify', false);

//db connection only for storing image
var conn = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Initialize GridFS
let gfs;
conn.once('open', () => {
  // console.log("console",conn.db)
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('HarvestImage');
});


// Use Routes
app.use('/api/map',mapRouter);
app.use('/api/transporterData', transporterDataRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/farmer', farmerRouter);
app.use('/api/scheduler',schedulerRouter);
//passing gridfs-stream as local var for getting image
app.use('/api/orders',(req,res,next)=>
                                  {
                                    req.app.locals.gfs=gfs;
                                    next();
                                  },
                                   ordersRouter);



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

module.exports  =app;
