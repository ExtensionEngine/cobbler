'use strict';

const { BAD_REQUEST, CREATED } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const pick = require('lodash/pick');
const { TeachingElement } = require('../shared/database');
const { teachingElements } = require('../../config/server/index');

module.exports = {
  create
};

function create(req, res, next) {
  const teachingElement = pick(req.body, [
    'name',
    'label',
    'type',
    'lectureId',
    'data'
  ]);

  if (!teachingElement.name ||
    !teachingElements.includes(teachingElement.type) ||
    isNaN(teachingElement.lectureId)) {
    throw new HttpError('Invalid body', BAD_REQUEST);
  }

  return TeachingElement.create(teachingElement)
    .then(teachingElement => res.status(CREATED).json({ data: teachingElement }))
    .catch(next);
}
