const UserSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require('../middleware/authenticate');
const mailUser = require('../middleware/nodemailer');
const logger = require('../../logger/logger');

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
                    logger.error("Error in service",err);
                    return callback(err,null);
                }
                else{
                    
                    let bool = bcrypt.compareSync(credentials.password,data.password);
                    if(bool){
                        const token = auth.generateToken(data);
                        logger.info("Password is valid");
                        return callback(null,{data,token});
                    }
                    else{
                        logger.error("Invalid password");
                        return callback("Invalid Password",null);
                    }
                }
            });
        }catch(err){
            console.log("Error occured");
        }
    }
    /**
     * @description:calls nodemailer if emailid exists in database
     * @param {*} email 
     * @param {*} callback 
     */
    forgotPassword = (email,callback)=>{
        //calls model layer
        UserSchema.forgotPassword(email,(err,data)=>{
            if(err||!data){
                logger.error(err);
                return callback(err,null);
            }
            else{//calls nodemailer to send email
                  mailUser.sendEmail(data,(err,res)=>{
                      if(err){
                          logger.error("Error occured while sending reset link",err);
                          return callback("Error occured while sending reset link",null);
                      }
                      else{
                          logger.info("Reset link sent succesfully");
                          const link = {
                              "id" :data._id,
                              "link":res.link
                          };
                          return callback(null,"Link sent");
                        }
                  });
                }
        })
    }    
    /**
     * @description:verifies token, if valid sends new password to model layer
     * @param {*} req 
     * @param {*} callback 
     */
    resetPassword = (req,callback)=>{
        const token = req.token;
        //verifies token
        const data =  auth.verifyToken(token);
                const credentials = {
                    id:data.dataForToken.id,
                    password : req.password
                }
                //object is passed to model layer
                UserSchema.resetPassword(credentials,(err,data)=>{
                    if(err){
                        console.log(err);
                        return callback(err,null);
                    }
                    else{
                         return callback(null,data);
                    }

                });   
        
    }
}
module.exports = new Service();