'use strict';

const winston = require('winston');

const logger = winston.createLogger({
  name: 'cobbler-server',
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]

});

module.exports = logger;
