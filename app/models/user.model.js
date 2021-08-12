const mongoose = require('mongoose');
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

//Save the database in a constant so that we can access it
const userRegister = mongoose.model('userRegister',userSchema);

class Registration{
    /**
     * @description: Adds data to the database
     * @param {*} newUser 
     * @param {*} callback 
     */
    newUserRegistration = (newUser,callback) =>{
        
        const user = new userRegister({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
             emailId: newUser.emailId,
            password: newUser.password
            });
        user.save((err,data) => {
            if(err){
                console.log("Error detected in model");
                return callback(err, null);
            }
            else{
                console.log("New user registered successfully!!!");
                return callback(null,data);
            }   
        });
        
    };
    /**
     * @description: Authenticates user information from the database
     * @param {*} credentials 
     * @param {*} callback 
     */
    login = (credentials,callback)=>{
        userRegister.findOne({'emailId':credentials.emailId},(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                if(!data){
                    return callback("Invalid email id",null);
                }
                else if(data.password == credentials.password){
                    return callback(null,data);
                }
                else{   
                    return callback("Invalid Password",null);
                }
            }
        });
    };
}
module.exports = new Registration();


