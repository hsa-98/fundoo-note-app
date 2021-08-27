const user = require('../controller/user.controller');
const note = require('../controller/note.controller')
module.exports=(app)=>{
//api for user registration

app.post('/register',user.registerUser);
//api for user login
app.post('/login',user.loginUser);
//api for forgot password
app.post('/forgotpassword',user.forgotPassword);
//api for reset password
app.put('/resetpassword',user.resetPassword);

//CRUD for notes
app.post('/createnotes',note.createNote);
app.get('/getnotes',note.getNote);
app.put('/updatenotes',note.updateNote);
}