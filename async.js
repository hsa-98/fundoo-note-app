const  example = async(call,back)=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            let x = Math.random();
            if(x<0.5){
                resolve(call(5,4));
            }else{
                reject(back(5,4))
            }
        },0)
    })
}
let add = (x,y)=>{
    return(x+y)
}

let subs = (x,y)=>{
    return(x-y);
}
const  app = async()=>{
    try{
        
       const  a = await example(add,subs);
       console.log("ok");
       console.log(a);
    }catch(e){
        console.log("catch")
        console.log(e)       
    }
}
app();
// const getData = async() => {
//     var y = await "Hello World";
//     console.log(y);
// }
  
// console.log(1);
// getData();
// console.log(2);
