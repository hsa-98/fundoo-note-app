const nodemailer = require('nodemailer');
require('dotenv').config
const auth = require('../middleware/authenticate');
const logger = require('../../logger/logger');
const { callbackPromise } = require('nodemailer/lib/shared');
const { error } = require('../../logger/logger');

/**
 * @description:Sends reset password link to the email id
 * @param {*} data 
 * @param {*} callback 
 */
exports.sendEmail = (data,callback) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        //auth:contains email id &password to authenticate the sender
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    })
    
    const token = auth.generateToken(data);
    //email body
    const mailOptions = {
        from: process.env.email,
        to: data.emailId,
        subject: 'Password change link',
        html: `
                <h2>please click on the link to change password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p> 
                <p>${token}</p>   `
    }
    //email is sent to the user using this function
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            logger.error(err);
             return callback(error,null);
        }
        else{
            logger.info(info.response)
            const data = {
                "link":process.env.CLIENT_URL+'/resetpassword/'+token,
                "response":info.response
            }
            return callback(null,data) ;
        }
    })
}