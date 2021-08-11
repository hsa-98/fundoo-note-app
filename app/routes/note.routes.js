const user = require('../controller/user.controller');
module.exports=(app)=>{

app.post('/register',user.registerUser);

app.post('/login',user.loginUser);
}