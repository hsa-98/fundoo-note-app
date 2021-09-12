const { data } = require('../../logger/logger');
const model = require('../models/note.model');
class Service{
    createNote = (note,callback)=>{
        model.createNote(note,(err,data)=>{
        if(err){
            return callback(err,null);
        }
        else{
            return callback(null,data);
        }
    }
    )}

    getNote = (id,callback)=>{
        model.getNote(id,(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    updateNote = (updatedNote,callback)=>{
        model.updateNote(updatedNote,(err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }

    deleteNote = (id,callback)=>{
        model.deleteNote(id,(err,data)=>{
            if(err){        
                return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }
    getNoteById = async(id)=>{
        try{
            return await model.getNoteById(id);
        }catch(err){
            return err;
        }
         
    }
    
    addLabel = async(id)=>{
        try{
            const data = await model.addLabel(id);
            return data;
        }
        catch(error){
            return error
        }
    }

    deleteLabel = async(id)=>{
        try{
            const data = await model.deleteLabel(id);
            return data;

        }catch(error){
            return error
        }
    }
}
 
module.exports = new Service();