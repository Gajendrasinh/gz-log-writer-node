var winston = require('winston');
require('winston-daily-rotate-file');
//var MongoDB = require('winston-mongodb').MongoDB;
//var winstonRemoteTransport = require('winston-remote').Transport;
winston.emitErrs = true;


var uilogger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'info',
            filename: 'VegmantraNodeService.log',
            handleExceptions: true,
            json: false,
            maxsize: 1048576, //15242880, //5MB
            maxFiles: 200,
            datePattern: '_yyyy-MM-dd',
            colorize: true

        })
    ],
    exitOnError: false
});

module.exports = uilogger;
module.exports.stream = {
    write: function(message, encoding) {
        uilogger.info(message);
    }
};