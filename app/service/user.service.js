const UserSchema = require('../models/user.model');

class Service{
    registerUser = (newUser,callback)=>{
        try{
        UserSchema.Registration.newUserRegistration(newUser,(err,data)=>{
            if(err){
                console.log("Error occured while registering new user");
                return callback(err,null);
            }
            else{
                console.log("User registered succesfully");
                return callback(nul,data);
            }
        });
    } catch(err){
        callback(err || "Some error occureed",null);
    }
    };
}
module.exports = {Service};