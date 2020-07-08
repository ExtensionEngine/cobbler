'use strict';

const { CREATED } = require('http-status-codes');
const pick = require('lodash/pick');
const { TeachingElement } = require('../shared/database');

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

  return TeachingElement.create(teachingElement)
    .then(teachingElement => res.status(CREATED).json({ data: teachingElement }))
    .catch(err => res.status(500).json({ err }));
}
