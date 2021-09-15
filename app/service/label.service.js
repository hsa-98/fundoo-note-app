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
        try{
            return await model.deleteLabel(id).then((data)=>data); 
        }catch(error){
            return error;
        }
    }
    async addNoteId(id){
        try{
            return await model.addNoteId(id)
        }catch(err){
            return err;
        }
    }

    async labelExists(id){
        
          return await model.labelExists(id);
    }
}

module.exports = new Service();