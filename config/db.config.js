require('dotenv').config()
const logger = require('../logger/logger');
const mongoose  = require ('mongoose');
exports.dbConnection = ()=>{
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true ,
    useFindAndModify:false
}).then(()=>{
    logger.info("Succesfully connected to db")
    console.log("Succesfully connected to db ")}
    ).catch(err=>{
        logger.error("could not connect to db .Exiting now ",err)
        console.log("could not connect to db .Exiting now ",err)
        process.exit();
    })
}