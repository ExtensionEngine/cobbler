'use strict';

class WrongCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongCredentialsError';
    this.statusCode = 401;
    Error.captureStackTrace(this, WrongCredentialsError);
  }
}

module.exports = { WrongCredentialsError };
