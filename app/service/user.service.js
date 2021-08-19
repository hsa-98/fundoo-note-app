const UserSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require('../middleware/authenticate')

class Service{
    /**
     * @description: Function sends new user info to model
     * @param {*} newUser 
     * @param {*} callback 
     */
    registerUser = (newUser,callback)=>{
        try{
        //call model layer
        UserSchema.registerUser(newUser,(err,data)=>{
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
            UserSchema.loginUser(credentials,(err,data)=>{
                if(err){
                    return callback(err,null);
                }
                else{
                    let bool = bcrypt.compareSync(credentials.password,data.password);
                    if(bool){
                        const token = auth.generateToken(data);
                        return callback(null,{data,token});
                    }
                    else{
                        return callback("Invalid Password",null);
                    }
                }
            });
        }catch(err){
            console.log("Error occured");
        }
    }
}
module.exports = new Service();