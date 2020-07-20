'use strict';

const { length, number, object, optional, string } = require('superstruct');
const bodyValidatorFactory = require('../shared/util/bodyValidatorFactory');
const router = require('express').Router();
const ctrl = require('./lecture.controller');

const createStruct = object({
  name: length(string(), 2, 50),
  description: optional(string()),
  courseId: number()
});

router
  .post('/', bodyValidatorFactory(createStruct), ctrl.create)
  .patch('/:id', bodyValidatorFactory(createStruct), ctrl.update);

module.exports = {
  path: '/lectures',
  router
};
