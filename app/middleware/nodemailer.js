const nodemailer = require('nodemailer');
require('dotenv').config
const auth = require('../middleware/authenticate');
const logger = require('../../logger/logger');


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
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            logger.error(error);
        }
        else{
            logger.error(info.response)
            console.log(info.response);
            return info.response;
        }
    })
}