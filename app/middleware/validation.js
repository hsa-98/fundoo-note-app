const validator = require('validator');

class authenticate{
     validate=(data,res)=>{

        if(!validator.isAlpha(data.firstName)){
            return res("Enter valid name",null);
        }
        if(!validator.isAlpha(data.lastName)){
            return res("Enter valid lastname",null);
        }
        if(!validator.isEmail(data.emailId)){
            return res("Enter valid email",null);
        }
        if(!validator.isStrongPassword(data.password)){
            return res("Password is weak",null);
        }
     }
}
module.exports = new authenticate();
