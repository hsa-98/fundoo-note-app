const { string } = require('joi');
const mongoose = require('mongoose');
const { info } = require('../../logger/logger');
const userRegister = require('../models/user.model')
const noteSchema = mongoose.Schema({

    /*user:{
        type: Schema.Types.ObjectId,
        ref: "userRegister"
    },*/
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userRegister' },

    title:{
        type:String
    },
    description:{
        type:String,
        required: true,
        minlength:2
    },
   /* labels:{
        type:[String]
    }*/
},{
    timestamps : true
});

const noteRegister = mongoose.model('noteRegister',noteSchema);
class Model{
    createNote = (info,callback)=>{
        const note= new noteRegister({
            userId:info.userId,
            title:info.title,
            description:info.description
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

    getNote = (id,callback)=>{
        noteRegister.find({userId:id.id},(err,data)=>{
            if(err){
                 return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    updateNote = (updatedNote,callback)=>{
        noteRegister.findOneAndUpdate({$and:[{_id:updatedNote.id},{userId:updatedNote.userId}]},{title:updatedNote.title,
        description:updatedNote.description},{new:true},(err,data)=>{
            if(err){
                console.log(err);
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