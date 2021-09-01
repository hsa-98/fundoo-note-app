const { data } = require('../../logger/logger');
const validateToken = require('../middleware/authenticate')
const service = require('../service/note.promiseservice')
class Notepromise {
    createNote =(req,res)=>{        
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
       const  validToken = validateToken.verifyToken(token);
        if(validToken){
            service.createNote(req.body.note).then(
                res.status(201).json({
                    message: "Successfully inserted note",
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
    }
}
module.exports = new Notepromise();