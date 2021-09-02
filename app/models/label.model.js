const mongoose = require('mongoose');
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
        try{
            new Promise((resolve,reject)=>{
                const label = new labelRegister({
                    labelName : data.labelName,
                    noteId : data.noteId
                })
                data = label.save();
                if(data){
                    console.log("label was  added")
                    return  resolve();
                }
                else{
                    console.log("label was not added")
                    return reject();
                }
            })
        }catch{
            console.log("Error occured")
        }
    }
}

module.exports = new Model();