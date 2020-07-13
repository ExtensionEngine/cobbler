'use strict';

const { BAD_REQUEST, CREATED } = require('http-status-codes');
const { createTe } = require('./teaching-element.service');
const { HttpError } = require('../shared/error');

module.exports = {
  create
};

function create(req, res, next) {
  let teachingElementPromise;
  try {
    teachingElementPromise = createTe(req.body);
  } catch (err) {
    throw new HttpError(err.message, BAD_REQUEST);
  }
  return teachingElementPromise
    .then(teachingElement => res.status(CREATED).json({ data: teachingElement }))
    .catch(next);
}
