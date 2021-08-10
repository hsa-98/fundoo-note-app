const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const dbConfig = require('./config/db.config');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Succesfully connected to database");
}).catch(err => {
    console.log("Could not connect to database. Error:",err);
    process.exit;
});

require('./app/routes/note.routes')(app);

app.get('/',(req,res) => {
    res.json({"message":"Welcome to fundoo notes app"});
});

app.listen(3000,() =>{
    console.log("App is listening on port number 3000");
})
