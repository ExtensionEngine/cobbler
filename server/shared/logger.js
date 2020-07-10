'use strict';

const { createLogger, format, transports } = require('winston');
const { cli, colorize, combine, printf, splat } = format;

const levels = {
  error: 0,
  debug: 1,
  warn: 2,
  sql: 3,
  http: 4,
  info: 5
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
  level: 'info',
  levels,
  transports: [
    new (transports.Console)()
  ]
});

module.exports = logger;
