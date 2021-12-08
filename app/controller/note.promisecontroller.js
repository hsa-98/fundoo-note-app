const { data } = require('../../logger/logger');
const validateToken = require('../middleware/authenticate')
const service = require('../service/note.promiseservice')
const {validateNote} = require('../middleware/joiValidation');
class Notepromise {
    createNote =(req,res)=>{    
        try{
        validateToken.validateNoteToken(req.headers.authorization);
        const valid = validateNote.validate(req.body.note);
        if(valid){
            service.createNote(req.body.note).then(
                 res.status(201).json({
                    message: "Successfully insert note,work",
                    success:true,
                    data:data})
                )
                .catch(
                    res.status(500).json({
                        message:"failed to post note",
                        success:false})
                    )
        }
        else{
             return res.status(400).json({
                message:"Please enter valid token"
            })

        }
    }catch{

    }
    }
}
module.exports = new Notepromise();
