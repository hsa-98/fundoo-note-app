const model = require('../models/note.model');
class Servicepromise{
    createNote = (note)=>{
        return new Promise((resolve,reject)=>{
            model.createNote(note,(err,data)=>{
                if(err){
                    reject();
                }
                else{
                    resolve();
                }
            })
        })
      
    }
}
module.exports = new Servicepromise();