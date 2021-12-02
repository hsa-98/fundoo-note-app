const mongoose = require('mongoose');
const { data } = require('../../logger/logger');
require('../../logger/logger');

const labelSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'userRegister'},
    
    noteId:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'noteRegister'}]
    },

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

    async deleteLabel(id){
        try{
            const data = await labelRegister.findById(id.labelId);
            console.log(data);
            await labelRegister.findByIdAndDelete(id.labelId);
             return data;
        }catch(err){
            return err;
        }
    }

    async addNoteId(id){
        try{
            const data = await labelRegister.findByIdAndUpdate(id.labelId,{$push:{"noteId":id.noteId}},{new:true});
            console.log(data);
            return data;
        }catch(err){
            return err;
        }
    }

    async labelExists(id){
        const labelId = {labelId : id.labelId}
       return await new Promise((resolve,reject)=>{
        labelRegister.find(labelId).then((data)=>{
            resolve(data);
        }).catch((err)=>reject(err));
       })
    }


    
}

module.exports = new Model();