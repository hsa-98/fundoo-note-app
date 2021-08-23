const user = require('../controller/user.controller');
module.exports=(app)=>{
//api for user registration

app.post('/register',user.registerUser);
//api for user login
app.post('/login',user.loginUser);
//api for forgot password
app.put('/forgotpassword',user.forgotPassword);
}