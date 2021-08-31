
const { data } = require('../../logger/logger');
const validateToken = require('../middleware/authenticate')
const service = require('../service/note.service')
const {validateNote} = require('../middleware/joiValidation');
class Note {
    createNote =(req,res)=>{        
       
       const  validToken = validateToken.validateNoteToken(req.headers.authorization);
        if(validToken){
            const valid = validateNote.validate(req.body.note);
            if(valid.error){
                res.status(400).send({
                    success:false,
                    message:"Please enter valid note"
                })
            }
            else{
                service.createNote(req.body.note,(err,data)=>{
                    if(err){
                        return res.status(500).json({
                            message:"failed to post note",
                            success:false
                        });
                    }
                    else{
                        return res.status(201).send({
                            message: "Successfully inserted note",
                            success:true,
                            data:data
                        })
                    }

                })
            }
        }
        else{
             return res.status(400).json({
                message:"Please enter valid token"
            })

        }
    }

    getNote = (req,res)=>{
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        console.log(token)
        const  validToken = validateToken.verifyToken(token);
        if(validToken){
            service.getNote((err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"failed to get note",
                        success:false
                    });
                }
                else{
                    return res.status(200).json({
                        message:"Notes retieved succesfully",
                        success:true,
                        data:data
                    })
                }
            })
        
        }else{
            return res.status(400).json({
                message:"Please enter valid token"
            })
        }
    }

    updateNote = (req,res)=>{
        try{
            const header = req.headers.authorization;
            const myArr = header.split(" ");
            const token = myArr[1];
            console.log(token)
           const  validToken = validateToken.verifyToken(token);
            const updatedNote = {
                id : req.params.id,
                note : req.body.note
            }
            service.updateNote(updatedNote,(err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"Note not updated",
                        success:false
                    })
                }
                else{
                    return res.status(200).json({
                        message:"Note updated",
                        success:true,
                        data:data
                    });
                }
            });
        }
        catch{
            return res.status(400).json({
                message:"Please enter valid token"
            })
        }
    }

    deleteNote = (req,res)=>{
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        const  validToken = validateToken.verifyToken(token);
            const id = {id:req.params.id}
            service.deleteNote(id,(err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"failed to delete",
                        success:false
                    });
                }
                else{
                    return res.status(200).json({
                        message:"Note deleted",
                        success:true
                    })                
                }

            })
    }
}

 module.exports = new Note();