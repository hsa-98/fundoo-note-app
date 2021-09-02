const { data } = require('../../logger/logger');
const model = require('../models/label.model')

class Service{
    createLabel = (label)=>{
        return new Promise((resolve,reject)=>{
            model.createLabel(label)
            .then(()=>resolve()
            ).catch( ()=>reject());
        })
    }

    getLabel =()=>{
        return new Promise((resolve,reject)=>{
            model.getLabel().then((data)=>{resolve(data)})
            .catch( ()=>{reject()});
        })
    }

    getLabelById = (id)=>{
        return new Promise((resolve,reject)=>{
            model.getLabelById(id).then((data)=>{resolve(data)})
            .catch( (err)=>{reject(err)})
        })
    }

    async updateLabel(label){
          await model.updateLabel(label).then((data)=>{return data})
            
    }

    async deleteLabel(id){
        await model.deleteLabel(id).then((data)=>{return data})
    
    }
}

module.exports = new Service();