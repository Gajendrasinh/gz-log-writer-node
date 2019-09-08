var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var multer = require("multer");
var app = express();
var json2csv = require('json2csv');
var fs = require('fs');
var dateFormat = require('dateformat');
var logger = require('./logger');
var uilogger = require('./uilogger');

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });


app.post('/writetouilog', function(req, res, next) {
    var now = new Date();

    var myjsonlog = {};
    var level = req.body.Level;
    myjsonlog['DateTime'] = dateFormat(now, "dd-mm-yyyy, h:MM:ss TT");;
    myjsonlog['Application'] = req.body.Application;
    myjsonlog['User'] = req.body.User;
    myjsonlog['TokenID'] = req.body.TokenID;
    myjsonlog['TokenSMS'] = req.body.TokenSMS;
    myjsonlog['ClassModule'] = req.body.ClassModule;
    myjsonlog['WebserviceName'] = req.body.WebserviceName;
    myjsonlog['Message'] = req.body.Message;
   if (level === 'INFO') {
        uilogger.info(myjsonlog);
    } else if (level === 'ERROR') {
        uilogger.error(myjsonlog);
    } else {
        uilogger.info(myjsonlog);
    }
    res.status(200).json({
        message: 'Success',
    });
});


setInterval(function () { 
    console.log('running every 5 minute'); 
}, 300000); 


var server = app.listen(8006, function() {
    logger.info("Server Started, and Listening on port %s...", server.address().port);
})
