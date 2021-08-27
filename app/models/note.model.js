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

const noteRegister = mongoose.model('noteRegister',noteSchema);
class Model{
    createNote = (info,callback)=>{
        const note= new noteRegister({
            title:info.title,
            note:info.note
        });
        note.save((error,data)=>{
            if(error){
                return callback(error,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    getNote = (callback)=>{
        noteRegister.find({},(err,data)=>{
            if(err){
                 return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    updateNote = (updatedNote,callback)=>{
        noteRegister.findByIdAndUpdate(updatedNote.id,{title:updatedNote.note.title,
        note:updatedNote.note.note},{new:true},(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    deleteNote = (id,callback)=>{
        try{
            noteRegister.findByIdAndDelete(id.id,(err,data)=>{
                if(err){
                    return callback(err,null);
                }
                else{
                    return callback(null,data);
                }
            })
        }catch{
            return callback(err,null);
        }
    }
}

module.exports = new Model();