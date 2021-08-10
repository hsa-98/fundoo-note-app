const service = require('../service/user.service');

class User{

    /**
     * @description : Function created to add user into database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = (req,res)=>{
    
        if(!req.body.firstName){
             return res.staus(400).send({message:"firstname content cannot be empty"});
        }   
        const register = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            emailId : req.body.emailId,
            password : req.body.password
        };
            
        service.registerUser(register,(err,data)=>{
            if(err){
                console.log("Error occured while registering new user");
                res.status(500).send({
                    message:err||"Some error occured while adding user"
                });
            }
            else{
                return res.status(201).json({
                    message: "User Registered",
                    data: data,
                });
            }
        });
    }

    /**
     * @description: Function created to verify user login info
     * @param {*} req 
     * @param {*} res 
     */
    loginUser = (req,res)=>{
        //check if email id is empty
        if(!req.body.emailId){
            return res.status(401).send({message:"Enter email id"});
        }
        //check if password is empty
        else if(!req.body.password){
            return res.status(401).send({message:"Enter Password"});
        }
        const credentials = {
            emailId : req.body.emailId,
            password : req.body.password
        };
        //call service layer
        service.loginUser(credentials,(err,data)=>{
            if(err){
                return res.status(401).send({message: err});
            }
            else{
                return res.status(200).json({
                    message:"Logged in succesfully",
                    data:data
                })
            }
        });

    }

}
module.exports = new User();