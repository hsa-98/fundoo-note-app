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

    getLabelById = (id)=>{
        return new Promise((resolve,reject)=>{
            model.getLabelById(id).then((data)=>{resolve(data)})
            .catch( (err)=>{reject(err)})
        })
    }

    async updateLabel(label){
        try{return await model.updateLabel(label)
            
        }catch(error){
            return error;
        }
                    
    }

    async deleteLabel(id){
        try{
            return await model.deleteLabel(id); 
        }catch(error){
            return error;
        }
        
    
    }
}

module.exports = new Service();