// const promise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{x= Math.random();
//         console.log(x)
//         if(x<0.5){
//             resolve()
//         }
//         else{
//             reject()
//         }},3000);
//     console.log("hehe");    

    
// })

// const add = (x,y)=>{
//     console.log(x+y)
// }
// const sub =(x,y)=>{
//     console.log(x-y)
// }

// promise.then(()=>{
//     add(5,4)
// }).then(()=>{
//     console.log("Promise chained")
// }).catch(()=>{
//     sub(5,4)
// })

const redis = require('./app/middleware/redis');
const  key ="613640b07d73d289f0da2f4d";
            const data = redis.cacheForTest(key);
            console.log(data);