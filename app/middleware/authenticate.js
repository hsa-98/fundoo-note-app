const Joi = require('joi');
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
    return jwt.sign({dataForToken},process.env.ACCESS_TOKEN_KEY,{expiresIn:'7d'});
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
exports.validateToken = (req,res,next)=>{
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    const verify = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
    if(verify){
        next();
    }
    else{
       return  res.status(400).send({
           message:"Invalid Token",
           success:false
       })
    }

}
exports.validateNoteToken = (data)=>{
    const header = data;
    const myArr = header.split(" ");
    const token = myArr[1];
    const verify = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
    if(verify){
        return true
    }
    else{
        return false
    }
}

