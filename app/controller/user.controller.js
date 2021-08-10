const service = require('../service/user.service');
const UserSchema = require('../models/user.model');

module.exports=class User{
    registerUser = (req,res)=>{
        try{
            if(!req.body.firstName){
                return res.staus(400).send({message:"Note content cannot be empty"});
            }   
            const register = new UserSchema({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                emailId : req.body.emailId,
                password : req.body.password
            });
            
            service.Service.registerUser(register,(err,data)=>{
                if(err){
                    console.log("Error occured while registering new user");
                    res.status(500).send({
                        message:err||"Some error occured while adding user"
                    });
                }
                else{
                    console.log("User registered succesfully")
                    res.status(201).send({
                        message:"User registered succesfully",
                        data:data
                    });
                }
            });

        }catch(err){
        res(err||"Some error occured while adding user ") 
        }
    }
}