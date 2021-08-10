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
const userRegister = mongoose.model('userRegister',UserSchema);

class Registration{
    newUserRegistration = (newUser,callback) =>{
        
        const user = new userRegister({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
             emailId: newUser.emailId,
            password: newUser.password
            });
        user.save((err,data) => {
            if(err){
                console.log("There was an error while saving user data");
                return callback(err, null);
            }
            else{
                console.log("New user registered successfully!!!");
                return callback(null,data);
            }   
        });
        
    }

    
}
module.exports = new Registration();


