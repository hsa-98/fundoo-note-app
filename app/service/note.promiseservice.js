const model = require('../models/note.promisemodel');
class Servicepromise{
    createNote = (note)=>{
        return new Promise((resolve,reject)=>{
            model.createNote(note).then(
                resolve()
            )
            .catch(reject())
        })
    }
}
module.exports = new Servicepromise();