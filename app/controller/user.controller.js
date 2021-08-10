const service = require('../service/user.service');

class User{
    registerUser = (req,res)=>{
        try{
            if(!req.body.firstName){
                return res.staus(400).send({message:"Note content cannot be empty"});
            }   
            const register = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                emailId : req.body.emailId,
                password : req.body.password
            };
            
            service.Service.registerUser(register,(err,data)=>{
                if(err){
                    console.log("Error occured while registering new user");
                    res.status(500).send({
                        message:err||"Some error occured while adding user"
                    });
                }
                else{
                    return res.status(201).json({
                        success: true, message: "User Registered",
                        data: data,
                    });
                }
            });

        }catch(err){
            return res.status(500).json({
                success: false, message: "Error While Registering",
                data: null,});
            }
    }
}
module.exports = new User();