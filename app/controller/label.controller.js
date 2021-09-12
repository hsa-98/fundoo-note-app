const service = require('../service/label.service');
const { data, error } = require('../../logger/logger');
const {verifyToken} = require('../middleware/authenticate');
const {validateLabel} = require('../middleware/joiValidation');
const { valid } = require('joi');
class Label{
     createLabel = (req,res)=>{
        try{
            const valid = validateLabel.validate(req.body);
            if(valid.error){
               return res.status(400).send({
                    message:"Please enter valid label",
                    success:false,
                    error:valid.error
                })
            }
            else{
                console.log(req.headers.authorization)
                const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
                const label = {
                    labelName:req.body.labelName,
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
            if( resolve.length > 0){
                res.status(200).send({
                    message:"labels retrieved",
                    success: true,
                    data:resolve
                })
            }
            else{
                res.status(404).send({
                    message:"Labels not found ",
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
            const valid = validateLabel.validate(req.body);
            if(valid.error){
                return res.status(400).send({
                    message:"Please enter valid label",
                    success:false,
                    error:valid.error
                })
            }
            else{
            const label = {
                labelName : req.body.labelName,
                labelId : req.params.id
            }
             const updatedlabel = await  service.updateLabel(label);
             if(updatedlabel.message){
                return res.status(404).send({
                    message:"Label Not Found",
                    success: false})
             }
               return  res.status(200).send({
                    message:"label updated",
                    success:true,
                    data:updatedlabel
                })
            }
            
        }catch(error){
            return res.status(500).send({
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
                res.status(200).send({
                    message:"Deleted label",
                    success:true
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