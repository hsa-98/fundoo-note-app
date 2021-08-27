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

    getNote = (callback)=>{
        model.getNote((err,data)=>{
            if(err){
                return callback(err,null);
            }
            else{
                return callback(null,data);
            }
        })
    }
}
 
module.exports = new Service();