const service = require('../service/label.service');
const { data } = require('../../logger/logger');
const {validateToken,verifyToken} = require('../middleware/authenticate')

class Label{
     createLabel = (req,res)=>{
        try{
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const label = {
                labelName:req.body.labelName,
                noteId : req.params.id,
                userId : tokenData.dataForToken.id
            }
                 service.createLabel(label,resolve,reject)
                function resolve(data){
                    res.status(201).send({
                        message:"Label created successfully",
                        success : true,
                        data:data
                    })
                }
                function reject(){
                    res.status(500).send({
                    message:"Label not created",
                    success : false})
                }

        }catch{
            return res.status(500).send({
                message:"Error occured",
                success:false
            })
        }        
    }
    getLabel = (req,res)=>{
        const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
        const id = tokenData.dataForToken.id
        service.getLabel(id,(resolve,reject)=>{
            if(resolve){
                res.status(200).send({
                    message:"labels retrieved",
                    success: true,
                    data:resolve
                })
            }
            else{
                res.status(500).send({
                    message:"Couldnt retrieve labels",
                    success:false
                })
            }
        })
    }
    
    getLabelById = (req,res)=>{
        const id = req.params.id
        service.getLabelById(id,(resolve,reject)=>{
            if(resolve){
                res.status(200).send({
                    message:"label Found",
                    success:true,
                    data:resolve
                })
            }
            else{
                res.status(500).send({
                    message:"label not Found",
                    success:false
                })
            }
        })    
    }
    
    updateLabel =async(req,res)=>{
        try{
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const label = {
                userId : tokenData.dataForToken.id,
                labelName : req.body.labelName,
                labelId : req.params.id
            }
             const updatedlabel = await  service.updateLabel(label);
             if(updatedlabel == null){
                 throw "Note not found"
             }
                res.status(200).send({
                    message:"label updated",
                    success:true,
                    data:updatedlabel
                })
            }catch(error){
            res.status(500).send({
                message:"Failed to update label",
                success: false,
                data:error
            })
        }
    }

    deleteLabel = async(req,res)=>{
        try{
            const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
            const id = {
                userId : tokenData.dataForToken.id,
                labelId : req.params.id};
             const data = await service.deleteLabel(id)
             console.log(data);
                res.status(200).send({
                    message:"Deleted label",
                    success:true,
                })
             
        }catch(err){
            res.status(500).send({
                message:"Failed to delete label",
                success:false,
                data:err
            })
        
        }
    }
}
module.exports = new Label();