const service = require('../service/label.service');
const { data } = require('../../logger/logger');
const validateToken = require('../middleware/authenticate')

class Label{
     createLabel = (req,res)=>{
        try{
            const label = {
                labelName:req.body.labelName,
                noteId : req.params.id
            }
            service.createLabel(label)
                .then((data)=>{
                    res.status(201).send({
                        message:"Label created successfully",
                        success : true,
                        data:data
                    })
                })
                .catch(()=>{
                    res.status(500).send({
                    message:"Label not created",
                    success : false})
                })

        }catch{
            return res.status(500).send({
                message:"Error occured",
                success:false
            })
        }        
    }
    getLabel = (req,res)=>{
        service.getLabel()
            .then((data)=>{
                res.status(200).send({
                    message:"labels retrieved",
                    success: true,
                    data:data
                })
            })
            .catch(()=>{
                res.status(500).send({
                    message:"Couldnt retrieve labels",
                    success:false
                })
            })
    }
    
    getLabelById = (req,res)=>{
        const id = {id:req.params.id}
        service.getLabelById(id).then((data)=>{
            res.status(200).send({
                message:"label Found",
                success:true,
                data:data
            })
        }).catch(()=>{
            res.status(500).send({
                message:"label not Found",
                success:false
            })
        })
    }
    
    updateLabel =(req,res)=>{
        const label = {
            labelName:req.body.labelName,
            labelId : req.params.id
        }
        service.updateLabel(label).then((data)=>{
            res.status(200).send({
                message:"label updated",
                success:true,
                data:data
            })
        }).catch(()=>{
            res.status(500).send({
                message:"Failed to update label",
                success: false
            })
        })
    }

    deleteLabel = (req,res)=>{
        const id = {id:req.params.id};
        service.deleteLabel(id).then((data)=>{
            res.status(200).send({
                message:"Deleted label",
                success:true,
                data:data
            })
        }).catch((err)=>{
            res.status(400).send({
                message:"Failed to delete label",
                success:false
            })
        })
    }

}
module.exports = new Label();