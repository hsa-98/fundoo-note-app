const { format,createLogger,transport } = require('winston');
const {timestamp,combine,json} = format;


const logger = createLogger({
    
    transports:[
         new transport.File({
             filename:'./info.log',
             level:'info',
             format:  combine(
                timestamp(),json())
         }),
         new transport.File({
             filename:'./error.log',
             level:'error',
             format:  combine(
                timestamp(),json())
         }) 
    ],
})

module.exports = logger;