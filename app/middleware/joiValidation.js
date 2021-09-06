const{required} = require('joi')
const Joi = require('joi')

/**
 * Validates info entered by user and returns error if input is not valid
 */
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
    emailId :Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
})
const validateReset = Joi.object({
    token: Joi.string().required(),
    password : Joi.string().min(8)
    .pattern(new RegExp('^(?=.*[!@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
})

const validateNote = Joi.object({
    title:Joi.string()
    .required(),

    description:Joi.string()
    .required()
})
module.exports = {authenticate,authenticateLogin,validateReset,validateNote};