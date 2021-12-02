// require('dotenv').config;
// const redis = require('redis');
// const logger = require('../../logger/logger')

// const client = redis.createClient(process.env.REDIS_PORT)

// class Redis{

//     noteCache = (req,res,next)=>{
//         const noteId = req.params.id;
//         client.get(noteId,(err,data)=>{
//             if(err){
//                 logger.error("Error while getting cache for note");
//                 console.log("Error while retrieving");
//             }
//             if(data!=null){
//                 data = JSON.parse(data);
//                 logger.info("Note cache retrieved");
//                 res.status(200).send({
//                     message:"notes retrieved",
//                     success:true,
//                     data:data
//                 })
//             }
//             else{
//                 next();
//             }
//         })
//     }

//     labelCache = (req,res,next)=>{
//         client.get(req.params.id,(err,data)=>{
//             if(err){
//                 logger.error("Error occured while getting label cache");
//                 console.log("Error while getiing label cache");
//             }
//             if(data!=null){
//                 const val = JSON.parse(data);
//                 logger.info("Label cache retrieved");
//                 res.status(200).send({
//                     message:"label retrieved",
//                     success:true,
//                     data:val
//                 });
//             }
//             else{
//                 next();
//             }
//         })
//     }

//    setData = (key,time,data)=>{
//     const key1 = key.toString();
//        client.SETEX(key1,time,data);
//    }
   
//    clearCache = (key)=>{
//         client.del(key,(err,res)=>{
//             if(err){
//                 logger.error("cache not cleared");
//             }
//             else{
//                 console.log("Cache cleared");
//                 logger.info("Cache clearer");
//             }
//         })
       
//    }
// }
// module.exports = new Redis();