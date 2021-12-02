const arr = [5,4,3,2];

let ans = arr.map((x)=>x*2);
console.log(ans);
ans = arr.filter((x)=>{
    if(x%2){
        return x;
    }
})
console.log(ans);

ans = arr.reduce((acc,curr)=>{
    if(curr>acc){
        acc= curr;
    }
    return acc;
},0)
console.log(ans);