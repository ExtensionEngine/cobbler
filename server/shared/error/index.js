'use strict';

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    Error.captureStackTrace(this, HttpError);
  }
}

class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
    Error.captureStackTrace(this, ValidationError);
  }
}

module.exports = { HttpError, ValidationError };
