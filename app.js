const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

//set header instead of cors()
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

//routes
const routes = require('./routes/index');

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//cors
app.use(cors());

//dotenv config
dotenv.config();

//default port
const port = process.env.PORT || 3000;

//view engine
app.set('view engine', 'ejs');

// mongoURI
const mongoURI = process.env.DATABASE_URL;


// Connect to MongoDB
mongoose.connect(mongoURI, () => {}, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the Mongo database")
}).catch(err =>{
    console.log("Could not connect to the DB at this moment",err)
    process.exit();
})


//static files
app.use(express.static(path.join(__dirname, 'public')))


//routes
app.use('/', routes);

//Source not found
app.use((req,res,next) =>{
    res.status(404).json({
        status: 404,
        msg: "Not Found"
    })
})

//error 500
app.use((err,req,res,next) =>{
    res.status(500).json({
        status: 500,
        msg: "Internal Server Error"
    })
    console.error(err.stack);
})

app.listen(port, () => {
    console.log(`listening on port ${port} ...`)
})