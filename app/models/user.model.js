const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    login =  async (credentials,callback)=>{
        userRegister.findOne({'emailId':credentials.emailId},(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                if(!data){
                    return callback("Email id doesnt exist",null);
                }
                else{
                    let bool = bcrypt.compareSync(credentials.password,data.password);
                    console.log(data.password);
                    console.log(credentials.password);
                    console.log(bool);
                    if(bool){
                        return callback(null,data);
                    } 
                    else{
                        return callback("Invalid Password",null);
                    } 
                }
            }
           
        });
    };
}
module.exports = new Registration();


