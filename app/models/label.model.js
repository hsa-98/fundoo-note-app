const mongoose = require('mongoose');
const { data } = require('../../logger/logger');
require('../../logger/logger');

const labelSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'userRegister'},
 
    labelName : {
        type:String,
        required:true
    },
   
},{
    timestamps : true
})

const labelRegister = mongoose.model('labelRegister',labelSchema);
class Model{
    createLabel = (data)=>{
        
        return new Promise((resolve,reject)=>{
            const label = new labelRegister({
                userId : data.userId,
                labelName : data.labelName
            })
            label.save().then((data)=>resolve(data))
                    .catch(()=> reject())
        })
    }

    getLabel = (id)=>{
        return new Promise((resolve,reject)=>{
         labelRegister.find({userId:id}).then((data)=>{
                resolve(data)})
                .catch(()=>reject())
        })
    }

    getLabelById = (id)=>{
        return new Promise((resolve,reject)=>{
         labelRegister.findById(id).then((data)=>{
                resolve(data);
            }).catch((err)=>reject(err))
        });
    }

    async updateLabel(label){
        try{
              return await labelRegister.findByIdAndUpdate(label.labelId,{labelName:label.labelName},{new:true});
               
         }catch(err){
            return err;
         }
    }

    async deleteLabel(label){
        try{
            return await labelRegister.findByIdAndDelete(label.labelId);
        }catch(err){
            return err;
        }
    }
}

module.exports = new Model();