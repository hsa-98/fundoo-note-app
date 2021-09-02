const user = require('../controller/user.controller');
const note = require('../controller/note.controller');
const label = require('../controller/label.controller');
const middleware = require('../middleware/authenticate')
module.exports=(app)=>{
//api for user registration

app.post('/register',user.registerUser);
//api for user login
app.post('/login',user.loginUser);
//api for forgot password
app.post('/forgotpassword',user.forgotPassword);
//api for reset password
app.put('/resetpassword',user.resetPassword);

//CRUD api for notes
app.post('/createnotes',note.createNote);
app.get('/getnotes',note.getNote);
app.put('/updatenotes/:id',note.updateNote);
app.delete('/deletenotes/:id',note.deleteNote);

//api for label
app.post('/createlabel/:id',middleware.validateToken,label.createLabel);
app.get('/getlabels',middleware.validateToken,label.getLabel);
app.get('/getlabel/:id',middleware.validateToken,label.getLabelById);
app.put('/updatelabel/:id',middleware.validateToken,label.updateLabel);
app.delete('/deletelabel/:id',middleware.validateToken,label.deleteLabel);
}