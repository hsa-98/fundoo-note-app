const UserSchema = require('../models/user.model');

class Service{
    /**
     * @description: Function sends new user info to model
     * @param {*} newUser 
     * @param {*} callback 
     */
    registerUser = (newUser,callback)=>{
        try{
        //call model layer
        UserSchema.newUserRegistration(newUser,(err,data)=>{
            if(err){
                console.log("Error occured while registering new user");
                return callback(err,null);
            }
            else{
                console.log("User registered succesfully");
                return callback(null,data);
            }
        });
    } catch(err){
        callback(err || "Some error occureed",null);
    }
    };

    /**
     * @description: Function gets data from model, whether it is valid or not. 
     * @param {*} credentials 
     * @param {*} callback 
     */
    loginUser = (credentials,callback)=>{
        try{
            //call model layer
            UserSchema.login(credentials,(err,data)=>{
                if(err){
                    return callback(err,null);
                }
                else{
                    return callback(null,data);
                }
            });

        }catch(err){

        }
    }
}
module.exports = new Service();