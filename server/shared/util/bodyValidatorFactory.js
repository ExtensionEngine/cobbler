'use strict';

const {
  assert,
  coerce,
  masked
} = require('superstruct');

const { BAD_REQUEST } = require('http-status-codes');

function reqBodyValidatorFactory(struct) {
  return function (req, res, next) {
    try {
      const data = coerce(req.body, masked(struct));
      assert(data, struct);
      req.validatedBody = data;
      return next();
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: err.message });
    }
  };
}

module.exports = reqBodyValidatorFactory;
