'use strict';

const { createLogger, format, transports } = require('winston');
const { cli, colorize, combine, printf, splat } = format;

const levels = {
  error: 0,
  info: 1,
  warn: 2,
  debug: 3
};

const logFormat = combine(
  cli({
    colors: {
      info: 'blue',
      error: 'red',
      debug: 'green',
      warn: 'orange'
    }
  }),
  colorize({ all: true }),
  splat(),
  printf(({ level, message, stack }) => stack
    ? `[${level}]: ${stack}`
    : `[${level}]: ${message}`)
);

const logger = createLogger({
  format: logFormat,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels,
  transports: [
    new (transports.Console)()
  ]
});

module.exports = logger;
