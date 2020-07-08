'use strict';

const { BAD_REQUEST, CREATED } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const { createTe } = require('./teaching-element.service');

module.exports = {
  create
};

function create(req, res, next) {
  return createTe(teachingElement)
    .then(teachingElement => res.status(CREATED).json({ data: teachingElement }))
    .catch(next);
}
