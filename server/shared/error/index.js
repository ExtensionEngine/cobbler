'use strict';

class BadCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadCredentialsError';
    Error.captureStackTrace(this, BadCredentialsError);
  }
}

module.exports = { BadCredentialsError };
