const { data } = require('../../logger/logger');
const model = require('../models/label.model')

class Service{
    createLabel = (label)=>{
        return new Promise((resolve,reject)=>{
            model.createLabel(label).then(()=>resolve()
            ).catch( ()=>reject());
        })
    }

    getLabel =()=>{
        return new Promise((resolve,reject)=>{
            model.getLabel().then((data)=>{resolve(data)})
            .catch( ()=>{reject()});
        })
    }
}

module.exports = new Service();