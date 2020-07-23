'use strict';

const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { logger } = require('../logger');

function errorHandler(err, req, res, next) {
  logger.error(err);
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(INTERNAL_SERVER_ERROR).json('Something went wrong');
}

module.exports = { errorHandler };
