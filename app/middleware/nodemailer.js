const nodemailer = require('nodemailer');
require('dotenv').config
const auth = require('../middleware/authenticate');
const logger = require('../../logger/logger');
const { callbackPromise } = require('nodemailer/lib/shared');
const { error } = require('../../logger/logger');


exports.sendEmail = (data) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    })
    
    const token = auth.generateToken(data);
    const mailOptions = {
        from: process.env.email,
        to: data.emailId,
        subject: 'Password change link',
        html: `
                <h2>please click on the link to change password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>    `
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            logger.error(err);
             return (err,null);
        }
        else{
            logger.info(info.response)
            console.log(info.response);
            const data = {
                "link":"${process.env.CLIENT_URL}+'/resetpassword/'+${token}",
                "response":info.response
            }
            return (null,data);
        }
    })
}