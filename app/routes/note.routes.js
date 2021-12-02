const user = require('../controller/user.controller');
const note = require('../controller/note.controller');
const label = require('../controller/label.controller');
const middleware = require('../middleware/authenticate');
//const redis = require('../middleware/redis');
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
app.post('/createnotes',middleware.validateToken,note.createNote);
app.get('/getnotes',middleware.validateToken,note.getNote);
app.get('/getnote/:id',middleware.validateToken,note.getNoteById);
app.put('/updatenotes/:id',middleware.validateToken,note.updateNote);
app.delete('/deletenotes/:id',middleware.validateToken,note.deleteNote);
app.post('/addlabel/:id',middleware.validateToken,note.addLabel);
app.post('/deletelabelfromnote/:id',middleware.validateToken,note.deleteLabel)

//api for label
app.post('/createlabel',middleware.validateToken,label.createLabel);
app.get('/getlabels',middleware.validateToken,label.getLabel);
app.get('/getlabel/:id',middleware.validateToken,label.getLabelById);
app.put('/updatelabel/:id',middleware.validateToken,label.updateLabel);
app.delete('/deletelabel/:id',middleware.validateToken,label.deleteLabel);
}