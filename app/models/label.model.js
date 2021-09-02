const mongoose = require('mongoose');
const { data } = require('../../logger/logger');
require('../../logger/logger');

const labelSchema = mongoose.Schema({
    labelName : {
        type:String,
        required:true
    },
    noteId : {
        type:String,
        required : true
    }
},{
    timestamps : true
})

const labelRegister = mongoose.model('labelRegister',labelSchema);
class Model{
    createLabel = (data)=>{
        
        return new Promise((resolve,reject)=>{
            const label = new labelRegister({
                labelName : data.labelName,
                noteId : data.noteId
            })
            label.save().then(()=>resolve())
                    .catch(()=> reject())
        })
    }

    getLabel = ()=>{
        return new Promise((resolve,reject)=>{
         labelRegister.find({}).then((data)=>{
                resolve(data)})
                .catch(()=>reject())
        })
    }

    getLabelById = (id)=>{
        return new Promise((resolve,reject)=>{
            labelRegister.findById(id.id).then((data)=>{
                resolve(data)
            }).catch((err)=>reject(err))
        });
    }

    async updateLabel(data){
        const label = new labelRegister({
            labelName: data.labelName
        });
         await labelRegister.findByIdAndUpdate(data.labelId,{labelName:data.labelName},
                {new:true}).then((data)=>{return data}).catch((err)=>{return err})
    }
    async deleteLabel(id){
        labelRegister.findByIdAndDelete(id.id).then((data)=>data).catch((err)=>err);
    }
}

module.exports = new Model();