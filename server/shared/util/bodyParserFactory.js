'use strict';

const {
  assert,
  coerce,
  masked
} = require('superstruct');
const { BAD_REQUEST } = require('http-status-codes');

function reqBodyParserFactory(struct) {
  return function (req, res, next) {
    const data = coerce(req.body, masked(struct));
    try {
      assert(data, struct);
      req.data = data;
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: err.message });
    }
    return next();
  };
}

module.exports = reqBodyParserFactory;
