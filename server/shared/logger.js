'use strict';

const { createLogger, format, transports } = require('winston');
const { cli, colorize, combine, printf, splat } = format;
require('dotenv').config();

const levels = {
  error: 0,
  info: 1,
  warn: 2,
  sql: 3,
  http: 4,
  debug: 5
};

const selectedLoggingLevel = () => {
  return (process.env.NODE_ENV === 'production') ? 'info' : 'debug';
};

const logFormat = combine(
  cli({
    colors: {
      info: 'blue',
      error: 'red',
      debug: 'green',
      warn: 'orange',
      http: 'white',
      sql: 'cyan'
    }
  }),
  colorize({ all: true }),
  splat(),
  printf(({ level, message }) => `[${level}]: ${message}`.replace('undefined', '\t'))
);

const logger = createLogger({
  format: logFormat,
  level: selectedLoggingLevel(),
  levels,
  transports: [
    new (transports.Console)()
  ]
});

module.exports = logger;
