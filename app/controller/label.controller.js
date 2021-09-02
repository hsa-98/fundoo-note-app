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
                .then(()=>{
                    res.status(201).send({
                        message:"Label created successfully",
                        success : true
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
}
module.exports = new Label();