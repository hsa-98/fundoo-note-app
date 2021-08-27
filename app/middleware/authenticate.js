const jwt = require('jsonwebtoken')
/**
 * @description: Generates a jwt token and returns to the user
 * @param {} data 
 * @returns 
 */
exports.generateToken = (data)=>{
    const dataForToken = {
        id: data._id,
        name : data.firstName,  
        lastName : data.lastName,
        emailId : data.emailId
    }
    return jwt.sign({dataForToken},process.env.ACCESS_TOKEN_KEY,{expiresIn:'24H'});
}

exports.verifyToken = (token)=>{
     const data = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
     if(data){
         return data;
     }
     else{
        return "couldnt verify" ;
     }
}