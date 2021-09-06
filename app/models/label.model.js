const mongoose = require('mongoose');
const { data } = require('../../logger/logger');
require('../../logger/logger');

const labelSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'userRegister'},

    noteId:{type:mongoose.Schema.Types.ObjectId, ref :'noteRegister'},
 
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
                noteId : data.noteId,
                labelName : data.labelName
            })
            label.save().then((data)=>resolve(data))
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
            const data = labelRegister.findById(id.id);
            (data!=null).then((data)=>{
                resolve(data)
            }).catch((err)=>reject(err))
        });
    }

    async updateLabel(labelData){
        const label = new labelRegister({
            labelName: labelData.labelName
        });
         const data = await labelRegister.findByIdAndUpdate(labelData.labelId,{labelName:data.labelName},{new:true})
                (data!=null)
                .then((data)=>{return data})
                .catch((err)=>{return err})
    }
    async deleteLabel(id){
        const data =labelRegister.findByIdAndRemove(id.id)
            (data)!=null.then((data)=>{
                console.log(data);
                return data
            })
            .catch((err)=>err);
    }
}

module.exports = new Model();