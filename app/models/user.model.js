const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
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
const userRegister = mongoose.model('UserRegister',UserSchema);
//export userschema so that controller and service can access the schema
module.exports = mongoose.model('UserSchema',UserSchema);

class Registration{
    newUserRegistration = (newUser,callback) =>{
        try{
            const user = new userRegister({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                emailId: newUser.emailId,
                password: newUser.password
            });
            user.save({},(err,data) => {
                if(err){
                    console.log("There was an error while saving user data");
                    return callback(err, null);
                }
                else{
                    console.log("New user registered successfully!!!");
                    return callback(null,err);
                }   
            });
        }catch (err){
            console.log("Error while registering new user");
        }
    }

    loginUser(clientCredentials,callback){
        userRegister.findOne({email : clientCredentials.emailId},(err,data) => {
            if (err){
                console.log("Error while login");
            }
            else if(!data){
                console.log("Email id not found  in the database");
            }
            else{
                console.log("Email Id found in the database");
                return callback(null, data);
            }
        });
    }
}
module.exports = {Registration};


