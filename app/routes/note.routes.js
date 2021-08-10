module.exports=(app)=>{
const user = require('../controller/user.controller');

app.post('/register',user.registerUser);

app.post('/login',user.loginUser);
}