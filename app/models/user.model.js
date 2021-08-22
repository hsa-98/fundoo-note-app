const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../../logger/logger');
const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 12
    },
    lastName: {
        type : String,
        required : true,
        minlength :3,
        maxlength : 12
    },
    emailId:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps : true
});

userSchema.pre('save',async function (next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }

})

//Save the database in a constant so that we can access it
const userRegister = mongoose.model('userRegister',userSchema);

class Registration{
    /**
     * @description: Adds data to the database
     * @param {*} newUser 
     * @param {*} callback 
     */
    registerUser = (newUser,callback) =>{
       try{ 
            const user = new userRegister({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                emailId: newUser.emailId,
                password: newUser.password
                });
            user.save((error,data) => {
                if(error){
                    logger.error("Error detected in model")
                    console.log("Error detected in model");
                    return callback(err, null);
                }
                else{
                    logger.info("User registered suucesfully")
                    console.log("New user registered successfully!!!");
                    return callback(null,data);
                }   
            });
        }catch(error){
            console.log("Error occured while registering user");
        }
    };
    /**
     * @description: Authenticates user information from the database
     * @param {*} credentials 
     * @param {*} callback 
     */
    loginUser = (credentials,callback)=>{
        try{
            userRegister.findOne({'emailId':credentials.emailId},(err,data)=>{
                if(err){
                    logger.error("Error occured while logging user",err);
                    return callback(err,null);
                }
                else{
                    if(!data){
                        logger.error("Email id doesnt exists");
                        return callback("Email id doesnt exist",null);
                    }
                    else{
                            logger.info("Email id found")
                            return callback(null,data) 
                    }
                }     
            });
        }catch(error){
            logger.error("Error occured while logging user",error);
            console.log("Error occured while logging in");
        }
    };
}
module.exports = new Registration();


