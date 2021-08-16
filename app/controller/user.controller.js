const service = require('../service/user.service')
const {authenticate,authenticateLogin} = require('../middleware/joiValidation')

class User{
    /**
     * @description : Function created to add user into database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = (req,res)=>{  
        try{      
            const register = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                emailId : req.body.emailId,
                password : req.body.password
            };
            const registerValid = authenticate.validate(register);

                if(registerValid.error){
                    res.status(400).send({
                        success:false,
                        message:console.error()
                    })
                    return;
                }
                    
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
                        success:true,
                        data: data,
                    });
                }
            });
         }catch(err){
            console.log("Error occured");
        }
    
    }

    /**
     * @description: Function created to verify user login info
     * @param {*} req 
     * @param {*} res 
     */
    loginUser = (req,res)=>{
        //check if email id is empty
        try{
            const credentials = {
                emailId : req.body.emailId,
                password : req.body.password
            };

            const loginValid = authenticateLogin.validate(credentials);
        
                if(loginValid.err){
                    res.status(400).send({
                        success:false,
                        message:err
                    })
                    return;
                }
                
            //call service layer
            service.loginUser(credentials,(err,data)=>{
                if(err){
                    return res.status(401).send({message: err});
                }
                else{
                    return res.status(200).json({
                        success:true,
                        message:"Logged in succesfully",
                        data:data.data,
                        token:data.token  
                    })
                }
            });
        }catch(err){
            console.log("Error occured");
        }
    }
}

module.exports = new User();