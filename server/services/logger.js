// TODO: fix logger

let logger

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const winston = require('winston');
  logger = winston.createLogger({
    silent: process.env.NODE_ENV === 'test',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });
}

// this was previously configured using winston 2.4.2 - it doesn't work, needs the be fixed

// else {
//   const winston = require('winston-old');
//   const { LoggingWinston } = require('@google-cloud/logging-winston');
//   const stackdriverLogging = new LoggingWinston();
//   logger = new winston.Logger({
//     level: 'info',
//     transports: [new winston.transports.Console(), stackdriverLogging],
//   });
// }

module.exports = {
  logger
};
