const mongoose = require('mongoose');
const { info } = require('../../logger/logger');
const noteSchema = mongoose.Schema({
    title:{
        type:String
    },
    note:{
        type:String,
        required: true,
        minlength:2
    }
},{
    timestamps : true
});

const noteRegister = mongoose.model('noteRegister1',noteSchema);
class Model{
    createNote = (info)=>{
        return new Promise((resolve,reject)=>{
            const note= new noteRegister({
                title:info.title,
                note:info.note
            });
            note.save()
                .then(resolve())
                .catch(reject());
        })  
    }
}
module.exports = new Model();