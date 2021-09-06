
const { data } = require('../../logger/logger');
const {validateToken,verifyToken} = require('../middleware/authenticate')
const service = require('../service/note.service')
const {validateNote} = require('../middleware/joiValidation');
class Note {
    createNote =(req,res)=>{        
       
        try{
            const valid = validateNote.validate(req.body.note);
            if(valid.error){
                return res.status(400).send({
                    success:false,
                    message:"Please enter valid note"
                })
            }
            else{const header = req.headers.authorization;
                const myArr = header.split(" ");
                const token = myArr[1];
                const tokenData = verifyToken(token);
                const note = {
                    userId:tokenData.dataForToken.id,
                    title:req.body.title,
                    description:req.body.description
                };
                service.createNote(note,(err,data)=>{
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
        }catch{
            return res.status(500).json({
                message:"Error occured",
                success:false
            })
        }
        
    }

    getNote = (req,res)=>{
        try{ 
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const id = {id:tokenData.dataForToken.id}
            service.getNote((id),(err,data)=>{
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
        }catch{
            return res.status(400).json({
                message:"Please enter valid token"
            })
        }
    }

    updateNote = (req,res)=>{
        try{
            const valid = validateToken.validateNoteToken(req.headers.authorization);
            const validNote = validateNote.validate(req.body);
            if(validNote.error){
                return res.status(400).send({
                    message:"Enter valid note",
                    success:false               
                 })
            }
            else{
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
        }
        catch{
            return res.status(400).json({
                message:"Please enter valid token"
            })
        }
    }

    deleteNote = (req,res)=>{
        try{
         validateToken.validateNoteToken(req.headers.authorization);
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
        }catch{
            return res.status(400).send({
                message : "Invalid Token",
                success:false
            })
        }
        
    }
}

 module.exports = new Note();