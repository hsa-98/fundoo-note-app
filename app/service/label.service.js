const { data } = require('../../logger/logger');
const model = require('../models/label.model')

class Service{
    createLabel = (label,resolve,reject)=>{
            model.createLabel(label)
            .then((data)=>resolve(data))
            .catch( ()=>reject());
        }
    

    getLabel =(id,callback)=>{
            model.getLabel(id).then((data)=>{callback(data,null)})
            .catch( (err)=>{callback(null,err)});
    }

    getLabelById = (id,callback)=>{
            model.getLabelById(id).then((data)=>{callback(data,null)})
            .catch( (err)=>{callback(null,err)})
        }
    

    async updateLabel(label){
        try{
            return await model.updateLabel(label)
            
        }catch(error){
            return error;
        }
                    
    }

    async deleteLabel(id){
        
            return await model.deleteLabel(id); 
       
    }
    async addNoteId(id){
        try{
            return await model.addNoteId(id)
        }catch(err){
            return err;
        }
    }

    labelExists = async(id)=>{
        try{
        const data = await model.labelExists(id);
        console.log(data);
         return true 
        }catch(err){
            console.log(err);
            return false;   
        }
    }
}

module.exports = new Service();