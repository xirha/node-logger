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

logger.request = function(req, res, error) {
    let date = new Date(); // .toUTCString();
    if (error) {
        logger.error(
            '[%s] "%s %s" Error (%s): "%s"',
            date, req.method.red, req.href,
            error.code, error.errno
        );
    }
    else {
        logger.debug('[%s] "%s %s"',
            date, req.method.cyan, req.href.cyan);
    }
};

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};