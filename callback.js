let callback = ((callback1,callback2)=>{
    setTimeout(()=>{
        x= Math.random();
        if(x<0.5){
            callback1(4,5)
        }
        else{
            callback2(5,4);
        }},0);
    console.log("HEhe")    
})
let add = (x,y)=>{
    console.log(x+y)
}

let subs = (x,y)=>{
    console.log(x-y);
}
callback(add,subs);

