'use strict';

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    Error.captureStackTrace(this, HttpError);
  }
}

module.exports = { HttpError };
