const express = require('express');
require('dotenv').config;
const dbConfig  = require('./config/db.config');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc));
dbConfig.dbConnection();

app.get('/',(req,res) => {
    res.json({"message":"Welcome to fundoo notes app"});
});

require('./app/routes/note.routes')(app);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.listen(process.env.PORT,() =>{
    console.log("App is listening on port number",process.env.PORT);
})
module.exports = app;