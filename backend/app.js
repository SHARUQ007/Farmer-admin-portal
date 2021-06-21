const express =require('express');
const mongoose =require('mongoose');
const path =require('path');
const cors =require('cors');
const bodyParser =require('body-parser');
const morgan =require('morgan');
const config =require('./config/index.js');

// routes
const authRouter =require('./routes/auth.routes.js');
const mapRouter =require('./routes/map.routes.js');
const userRouter =require('./routes/user.routes.js');
const farmerRouter =require('./routes/farmer.routes.js');
const ordersRouter =require('./routes/orders.routes.js');

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

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

// Use Routes
app.use('/api/map', mapRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/farmer', farmerRouter);
app.use('/api/orders', ordersRouter);



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports  =app;
