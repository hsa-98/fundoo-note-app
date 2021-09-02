const service = require('../service/label.service');
const { data } = require('../../logger/logger');
const validateToken = require('../middleware/authenticate')

class Label{
     createLabel = (req,res)=>{
        try{
            const validate = validateToken.validateNoteToken(req.headers.authorization);
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
            return res.status(400).send({
                message:"Please enter valid token",
                success:false
            })
        }        
    }
}
module.exports = new Label();