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

    module.request = function(req, res, error) {
        let date = new Date(); // .toUTCString();
        if (error) {
            module.error(
                '[%s] "%s %s" Error (%s): "%s"',
                date, req.method.red, req.href,
                error.code, error.errno
            );
        }
        else {
            module.debug('[%s] "%s %s"',
                date, req.method.cyan, req.href.cyan);
        }
    };

    return module;
};
module.exports.stream = {
    write: function(message, encoding){
        module.info(message);
    }
};
