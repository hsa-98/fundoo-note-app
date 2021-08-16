const express = require('express');
const dbConfig  = require('./config/db.config');
require('dotenv').config;
const app = express();
console.log(process.env.PORT);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

dbConfig.dbConnection();
require('./app/routes/note.routes')(app);

app.get('/',(req,res) => {
    res.json({"message":"Welcome to fundoo notes app"});
});

app.listen(process.env.PORT,() =>{
    console.log("App is listening on port number ${process.env.PORT}");
})
module.exports = app;