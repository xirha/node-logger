#!/usr/bin/node

// run with NodeJs
'use strict';

let argv = require("optimist").argv;

let winston     = require('winston'),
    colors      = require('colors');

require("winston-syslog-posix");

winston.emitErrs = true;

let transports = [];

let consoleLevel = 'info';

if(argv.debug){
    consoleLevel = 'debug';
}

if(argv.S || argv.syslog) {
    transports.push(
        new winston.transports.SyslogPosix({
            level: consoleLevel,
            handleExceptions: false,
            json: true,
            colorize: false
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            level: consoleLevel,
            handleExceptions: false,
            json: false,
            colorize: true
        })
    );
}

let logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};