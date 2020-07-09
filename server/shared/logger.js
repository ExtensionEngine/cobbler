'use strict';

const { createLogger, format, transports } = require('winston');

const levels = {
  error: 0,
  debug: 1,
  warn: 2,
  sql: 3,
  info: 4,
  verbose: 5
};

const logFormat = format.combine(
  format.cli({
    colors: {
      info: 'blue',
      error: 'red',
      debug: 'green',
      http: 'darkred',
      warn: 'orange',
      sql: 'cyan'
    }
  }),
  format.colorize({ all: true }),
  format.simple(),
  format.printf(({ level, message }) => `[${level}]: ${message}`.replace('undefined', '\t'))
);

const logger = createLogger({
  format: logFormat,
  level: 'info',
  levels,
  transports: [
    new (transports.Console)()
  ]
});

module.exports = logger;
