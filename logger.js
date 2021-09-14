#!/usr/bin/node

// run with NodeJs
'use strict';

let argv = require("optimist").argv;
let winston     = require('winston');
require("winston-syslog-posix");
winston.emitErrs = true;

module.exports = function(label){
    let transports = [];
    if(argv.S || argv.syslog) {
        transports.push(
            new winston.transports.SyslogPosix({
                level: argv.debug ? 'debug' : 'info',
                handleExceptions: false,
                json: true,
                colorize: true,
                label: label,
                identity: label || process.title
            })
        );
    } else {
        transports.push(
            new winston.transports.Console({
                level: argv.debug ? 'debug' : 'info',
                handleExceptions: false,
                json: false,
                colorize: true,
                label: label,
                timestamp: true
            })
        );
    }

    let module = new winston.Logger({
        transports: transports,
        exitOnError: false
    });

    module.logRequest = function(req, res, args, duration) {
        let FgBlack = "\x1b[30m";
        let FgRed = "\x1b[31m";
        let FgGreen = "\x1b[32m";
        let FgYellow = "\x1b[33m";
        let FgBlue = "\x1b[34m";
        let FgMagenta = "\x1b[35m";
        let FgCyan = "\x1b[36m";
        let FgWhite = "\x1b[37m";
        let FgReset = "\x1b[0m";
        
        let color = res.statusCode < 400 ? FgGreen : FgRed;
        let color_ms = duration > 5000 ? FgRed : (duration > 1000 ? FgYellow : FgReset);
        
        module.debug(req.method + ' '
            + FgCyan + (typeof req.uri == 'object' ? req.uri.href : req.uri) + FgReset + ' '
            + color + res.statusCode + ' (' + res.statusMessage + ')' + FgReset +  ' '
            + color_ms + duration + "ms " + FgReset
        );
    };
    
    return module;
};
module.exports.stream = {
    write: function(message, encoding){
        module.info(message);
    }
};
