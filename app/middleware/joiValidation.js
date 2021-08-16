const{required} = require('joi')
const Joi = require('joi')


const authenticate = Joi.object({
    firstName : Joi.string().min(3).required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),
    lastName :  Joi.string().min(3).required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),
    emailId : Joi.string()
                .email()
                .required(),
    password : Joi.string().min(8)
                .pattern(new RegExp('^(?=.*[!@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
     
});

const authenticateLogin = Joi.object({
    emailId :Joi.string().
    pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
     .required()
})
module.exports = {authenticate,authenticateLogin};