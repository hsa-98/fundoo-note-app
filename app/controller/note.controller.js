
const validateToken = require('../middleware/authenticate')
const service = require('../service/note.service')
class Note {
    createNote =(req,res)=>{        
       const  validToken = validateToken.verifyToken(req.body.token);
        if(validToken){
            service.createNote(req.body.note,(err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"failed to post note",
                        success:false
                    });
                }
                else{
                    return res.status(201).json({
                        message: "Successfully inserted note",
                        success:true,
                        data:data
                    })
                }

            })
        }
        else{
             return res.status(400).json({
                message:"Please enter valid token"
            })

        }
    }

    getNote = (req,res)=>{
        const  validToken = validateToken.verifyToken(req.body.token);
        if(validToken){
            service.getNote((err,data)=>{
                if(err){
                    return res.status(500).json({
                        message:"failed to get note",
                        success:false
                    });
                }
                else{
                    return res.status(200).json({
                        message:"Notes retieved succesfully",
                        success:true,
                        data:data
                    })
                }
            })
        
        }else{
            return res.status(400).json({
                message:"Please enter valid token"
            })
        }
    }
}

 module.exports = new Note();