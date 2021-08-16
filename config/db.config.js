require('dotenv').config()
const mongoose  = require ('mongoose');
exports.dbConnection = ()=>{
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true 
}).then(()=>{
    console.log("Succesfully connected to db ")}
    ).catch(err=>{
        console.log("could not connect to db .Exiting now ",err)
        process.exit();
    })
}