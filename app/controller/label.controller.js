const service = require('../service/label.service');
 require('../../logger/logger');
const {verifyToken} = require('../middleware/authenticate');
const {validateLabel} = require('../middleware/joiValidation');
 require('joi');
const logger = require('../../logger/logger');
const redis = require('../middleware/redis');
const note = require('../service/note.service');


class Label{
     createLabel = (req,res)=>{
        try{
            const valid = validateLabel.validate(req.body);
            if(valid.error){
                logger.error("Invalid label body")
               return res.status(400).send({
                    message:"Please enter valid label",
                    success:false,
                    error:valid.error
                })
            }
            else{
                const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
                const label = {
                    labelName:req.body.labelName,
                    userId : tokenData.dataForToken.id
                }
                     service.createLabel(label,resolve,reject)
                    function resolve(data){
                        logger.info("Label inserted");
                        res.status(201).send({
                            message:"Label created successfully",
                            success : true,
                            data:data
                        });
                    }
                    function reject(){
                        logger.error("Label not created");
                        res.status(500).send({
                        message:"Label not created",
                        success : false});
                    }
            }
        }catch{
            logger.error("Label not created error occured");
            return res.status(500).send({
                message:"Error occured",
                success:false
            });
        }        
    }


    getLabel = (req,res)=>{
        const tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
        const id = tokenData.dataForToken.id;
        service.getLabel(id,(resolve,reject)=>{ 
            if( resolve.length > 0){
                logger.info("Found all labels")
                res.status(200).send({
                    message:"labels retrieved",
                    success: true,
                    data:resolve
                });
            }
            else{
                logger.error("Label Not found")
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
                logger.info("Found label by id");
                const data = JSON.stringify(resolve);
                redis.setData(id,3600,data);
                res.status(200).send({
                    message:"label Found",
                    success:true,
                    data:resolve
                });
            }
            else{
                logger.error("Label not found by id")
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
                logger.error("Invalid label given to update")
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
                 logger.error("Label to be updated not found")
                return res.status(404).send({
                    message:"Label Not Found",
                    success: false})
             }
                logger.info("label updated");
                redis.clearCache(req.params.id);
               return  res.status(200).send({
                    message:"label updated",
                    success:true,
                    data:updatedlabel
                })
            }
            
        }catch(error){
            logger.error("Label to be updated not foudn due to error")
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
            const data = await service.deleteLabel(id);
            await note.removeLabel(data.noteId,id.labelId);
            logger.info("Label deleted");
            redis.clearCache(req.params.id);
            res.status(200).send({
                message:"Deleted label",
                success:true
            })
             
        }catch(err){
            logger.error("Label not deleted")
            res.status(500).send({
                message:"Failed to delete label",
                success:false,
                Error:err
            })
        
        }
    }
     addNoteId = async(id,res)=>{
          
    //         // let a = map.get(id);
    //         // if(a.length == 0 || a == null){
    //         //     a = [id.noteId];
    //         //     map.set(id.labelId,a);
    //         //     for( var i in map){
    //         //         console.log('key : ' + keys[i] + ' val : ' + map[keys[i]]);
    //         //     }
    //         // }
    //         // else{
    //         //     a.push(id.noteId);
    //         //     map.set(id.labelId,a);
    //         //     for( var i in map){
    //         //         console.log('key : ' + keys[i] + ' val : ' + map[keys[i]]);
    //         //     }
    //         //     }
    try{
            await service.addNoteId(id);
            redis.clearCache(id.labelId);
            return;
         }  
         catch(err){
             return err
         }
     }

     
    
}
module.exports = new Label();