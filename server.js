const express = require('express');
require('dotenv').config;
const dbConfig  = require('./config/db.config');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const cors = require('cors');
const app = express();

const whiteList = ["http://localhost:4000/resetpassword","http://localhost:4000/register",
"http://localhost:4000/login"
];

/*const corsOptionsDelegate = (req,callback)=>{
    let corsOptions;
    console.log(req.header);
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin : true}
    }
    else{
        corsOptions = { origin : false}
    }
    callback(null,corsOptions);
}*/
app.use(cors({
    origin: ["http://localhost:4000/resetpassword","http://localhost:4000/register",
    "http://localhost:4000/login"
    ]

}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc));
dbConfig.dbConnection();

app.get('/',/*cors(corsOptionsDelegate),*/(req,res) => {
    res.json({"message":"Welcome to fundoo notes app"});
});

require('./app/routes/note.routes')(app);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.listen(process.env.PORT,() =>{
    console.log("App is listening on port number",process.env.PORT);
})
module.exports = app;