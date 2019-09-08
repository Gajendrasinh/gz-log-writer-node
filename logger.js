var winston = require('winston');
require('winston-daily-rotate-file');
winston.emitErrs = true;


var logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'info',
            filename: 'VegmantraNodeService.log',
            handleExceptions: true,
            json: false,
            colorize: true,
            maxsize: 15242880, //5MB
            maxFiles: 200,
            datePattern: '_yyyy-MM-dd'
        }),
        new winston.transports.Console({
            level: 'info',
            colorize: true,
            handleExceptions: true,
            json: false,
            colorize: false
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};