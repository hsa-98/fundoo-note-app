require('dotenv').config;
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_PORT)

class Redis{

    cache = (req,res,next)=>{
        client.get("notes",(err,data)=>{
            if(err){
                console.log("Error while retrieving");
            }
            if(data!=null){
                data = JSON.parse(data)
                res.status(200).send({
                    message:"notes retrieved",
                    success:true,
                    data:data
                })
            }
            else{
                next();
            }
        })
    }

   setData = (key,time,data)=>{
       client.SETEX(key,time,data);
   } 
}
module.exports = new Redis();