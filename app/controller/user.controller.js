const service = require('../service/user.service')
const { authenticate, authenticateLogin,validateReset } = require('../middleware/joiValidation');
const logger = require('../../logger/logger');
const { bool } = require('joi');

class User {
    /**
     * @description : Function created to add user into database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = (req, res) => {
        try {
            const register = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: req.body.password
            };
            const registerValid = authenticate.validate(register);

            if (registerValid.error) {
                res.status(400).send({
                    success: false,
                    message: "Invalid details"
                })
                logger.error("Invalid credentials");
                return;
            }

            service.registerUser(register, (error, data) => {
                if (error) {
                    logger.error("Error occured while registering new user");
                    console.log("Error occured while registering new user");
                    res.status(500).send({
                        message: "Some error occured while adding user"
                    });
                }
                else {
                    logger.info("User registered");
                    return res.status(201).json({
                        message: "User Registered",
                        success: true,
                        data: data,
                    });
                }
            });
        } catch (error) {
            logger.error("Error occured in controller");
            console.log("Error occured");
        }

    }

    /**
     * @description: Function created to verify user login info
     * @param {*} req 
     * @param {*} res 
     */
    loginUser = (req, res) => {
        //check if email id is empty
        try {
            const credentials = {
                emailId: req.body.emailId,
                password: req.body.password
            };

            const loginValid = authenticateLogin.validate(credentials);

            if (loginValid.err) {
                res.status(400).send({
                    success: false,
                    message: err 
                })
                return;
            }

            //call service layer
            service.loginUser(credentials, (error, data) => {
                if (error) {
                    return res.status(401).send({ message: error });
                }
                else {
                    const userInfo={
                        emailId:data.data.emailId,
                        token:data.token
                    }
                    return res.status(200).json({
                        success: true,
                        message: "Logged in succesfully",
                        data: userInfo
                        
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * @description:Calls service layer to send reset password link
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    forgotPassword=(req,res)=>{
        const email = req.body;
        //validates the email id
        const loginValid = authenticateLogin.validate(email);
        if(loginValid.error){
            logger.error("Invalid email id")
           return res.status(400).send({
                success:false,
                message:"Invalid email please try again"
            });
        
        }
        else{
            service.forgotPassword(email,(error,data)=>{
                if(error){
                    return res.status(400).send({ success:false,
                        message:"Email id doesnt exist"});
                }
                else{
                    console.log("link sent");
                    return res.status(200).json({
                        success:true,
                        message:"Email reset link sent succesfully",
                        data:data
                    })
                }
            })
        }
    }
    /**
     * @description:calls service layer to reset password
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    resetPassword = (req,res)=>{
        //checks if the new password is valid
        try{
        const data ={
            token:req.body.token,
            password:req.body.password
        }
        const resetValid = validateReset.validate(data);
        if(resetValid.error){
            console.log("1");
            return res.status(400).send({
                success: false,
                message: "Invalid password please try again" 
            });
        }
        else{
            //object containing required data to reset password
            service.resetPassword(data,(err,data)=>{
                if(err){
                    console.log("2");
                    return res.status(400).send({
                        message:"Failed to reset password",
                        success:false
                        
                    });
                }
                else{
                    return res.status(200).send({
                        success:true,
                        message:data
                    });
                }
            })
        }
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Invalid Token"
        })
    }
    }
}

module.exports = new User();