const service = require('../service/user.service')
const { authenticate, authenticateLogin,validateReset } = require('../middleware/joiValidation');
const logger = require('../../logger/logger');

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
                    return res.status(200).json({
                        success: true,
                        message: "Logged in succesfully",
                        data: data.data,
                        token: data.token
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
        if(loginValid.err){
            logger.error("Invalid email id")
            res.status(400).send({
                success:false,
                message:err
            })
            return;
        }
        service.forgotPassword(email,(error,data)=>{
            if(error){
                return res.status(400).send({error});
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
    /**
     * @description:calls service layer to reset password
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    resetPassword = (req,res)=>{
        //checks if the new password is valid
        const resetValid = validateReset.validate(req.body.password)
        if(resetValid.err){
            res.status(400).send({
                success: false,
                message: err 
            })
            return;
        }
        //object containing required data to reset password
        const data ={
            token:req.body.token,
            password:req.body.password
        }
        
        service.resetPassword(data,(err,data)=>{
            if(err){
                res.status(500).send({
                    success:false,
                    message:err
                })
            }
            else{
                res.status(200).send({
                    success:true,
                    message:data
                });
            }
        })

    }
}

module.exports = new User();