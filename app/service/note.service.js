
const model = require('../models/note.model');
const redis = require('../middleware/redis');
const { not } = require('joi');
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

    removeLabel = async(note,label)=>{
        try{
            let a = []
            for(let i = 0; i < note.length ; i++){
                console.log(note[i]);
                 a.push(await model.removeLabel(note[i],label));
                 redis.clearCache(note[i]);

                }
            return a;

        }
        catch(err){
            return err;
        }
    }

    labelAdded = async(id)=>{
        const data = await model.getNoteById(id);
        for( let i = 0;i < data.labelId.length;i++ ){
            if( data.labelId[i] == id.labelId){
                return true;
            }
        }
        return false;

    }

}
 
module.exports = new Service();