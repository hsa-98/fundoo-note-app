
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
            else{
                const header = req.headers.authorization;
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

    getNoteById = async (req,res)=>{
        try{
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const id = {userId:tokenData.dataForToken.id,
                noteId:req.params.id};
            const data = await service.getNoteById(id);
            if(data.length == 0){
                throw 'Not authorized to access note'
            }
            if(data.message){
                return res.status(404).json({
                    message:"Note not found",
                    success:false,
                }) 
            }
            return res.status(200).json({
                message:"Note retieved succesfully",
                success:true,
                data:data
            })


        }catch(err){
            return res.status(401).json({
                error:err,
                success:false
            });
        }
    }

    updateNote = (req,res)=>{
        try{
            const validNote = validateNote.validate(req.body);
            if(validNote.error){
                return res.status(400).send({
                    message:"Enter valid note",
                    success:false               
                 })
            }
            else{
                const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
                 const updatedNote = {
                    id : req.params.id,
                    title: req.body.title,
                    description : req.body.description,
                    userId: tokenData.dataForToken.id
                }
                service.updateNote(updatedNote,(error,data)=>{
                    if(error){
                        return res.status(500).json({
                            message:"Note not updated",
                            success:false,
                            error:error
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
        }catch(err){
            return res.status(500).json({
                message:"Note not updated",
                success:false,
                data:err
            })
        } 
    }

    deleteNote = (req,res)=>{
        
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const ids = {
                id:req.params.id,
                userId:tokenData.dataForToken.id
            }
            service.deleteNote(ids,(err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"failed to delete",
                        success:false,
                        data:err
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

    addLabel = async(req,res)=>{
        try{
            const id = {
                noteId:req.params.id,
                labelId:req.body.labelId
            }
            const labels = await service.addLabel(id);
            res.status(200).send({
                message:"Label added",
                success:true,
                data:labels
            })
        }catch(err){
            res.status(500).send({
                message:"Label wasnt added",
                success:false,
                error:err
            })
        }
    }

    deleteLabel = async(req,res)=>{
        try{
            const id = {
            labelId:req.body.labelId,
            noteId:req.params.id
            }
            const data = await service.deleteLabel(id);
            res.status(200).send({
                message:"Label deleted",
                success:true,
                data:data
            })

        }catch(err){
            res.status(500).send({
                message:"Label wasnt deleted",
                success:false,
                error:err
            })
        }
    }
}

 module.exports = new Note();