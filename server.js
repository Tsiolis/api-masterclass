const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const errorHandler= require("./middleware/error");
const connectDb = require("./config/db");

//Load env
dotenv.config({path: './config/config.env'});


//Connect to DB
connectDb();

//Route files
const bootcamps = require('./routes/bootcamps');



const app = express();


//Body Parser
app.use(express.json());

//Dev logging middelware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}


//Mount routes
app.use('/api/v1/bootcamps', bootcamps);



app.use(errorHandler);



const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    //Close Server & Exit Process
    server.close(()=>{process.exit(1)});
})