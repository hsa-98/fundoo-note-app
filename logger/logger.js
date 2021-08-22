const { format,createLogger,transports } = require('winston');
const {timestamp,combine,json} = format;


const logger = createLogger({
    
    transports:[
         new transports.File({
             filename:'./info.log',
             level:'info',
             format:  format.combine(
                format.timestamp(),format.json())
         }),
         new transports.File({
             filename:'./error.log',
             level:'error',
             format:  combine(
                timestamp(),json())
         }) 
    ],
})

module.exports = logger;