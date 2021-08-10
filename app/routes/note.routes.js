module.exports=(app)=>{
const user = require('../controller/user.controller');

app.post('/register',user.registerUser);
}