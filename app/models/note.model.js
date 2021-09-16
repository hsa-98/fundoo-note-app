const { string } = require('joi');
const mongoose = require('mongoose');
const { info } = require('../../logger/logger');
const userRegister = require('../models/user.model')
const noteSchema = mongoose.Schema({

 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userRegister' },

    title:{
        type:String
    },
    description:{
        type:String,
        required: true,
        minlength:2
    },
    labels:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'labelRegister'}]
}
},{
    timestamps : true
}
);

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

    getNoteById = async (id)=>{
        try{
            return await noteRegister.find({$and:[{_id:id.noteId},{userId:id.userId}]});
            
        }catch(err){
            return err;
        }
        
    }

    updateNote = (updatedNote,callback)=>{
        try{
            noteRegister.findByIdAndUpdate(updatedNote.id,{title:updatedNote.title,
                description:updatedNote.description},{new:true},(err,data)=>{
                    if (err){
                        return callback(err,null);
                    }
                    else{
                        return callback(null,data);
                    }
                });
          }catch(err){
            return callback(err,null)
        }
        
    }

    
    

    deleteNote = (ids,callback)=>{
        try{
            noteRegister.findOneAndDelete({$and:[{_id:ids.id},{userId:ids.userId}]},(err,data)=>{
                if(err){
                    return callback(err,null);
                }
                else{
                    return callback(null,data);
                }
            })
        }catch(err){
            return callback(err,null);
        }
    }

    addLabel = async(id)=>{
        try{
            return await noteRegister.findByIdAndUpdate(id.noteId,
                {$push:{"labels": id.labelId} }, {new:true});
        }catch(err){
            return error
        }
    }

    deleteLabel = async(id)=>{
        try{
            return await noteRegister.findByIdAndUpdate(id.noteId,
                {$pull : {"labels":id.labelId}});
        }catch(error){
            return error;
        }
    }

    removeLabel = async(note,label)=>{
        try{
        const id = {
            note : note,
            label:label
        };
        console.log(id.note);
        return await noteRegister.findByIdAndUpdate(id.note,
            {$pull : {"labels": id.label}});
        }catch(err){
            console.log(err);
            return err;
        }
    }

    // addLabel = async(id)=>{
    //     try{
    //         const data =await  noteRegister.find({_id:id.noteId}).populate("labels").then(noteRegister=>noteRegister)
    //         console.log(data)
    //         return data
    //     }catch(error){
    //         return error
    //     }
    // }
}

module.exports = new Model();