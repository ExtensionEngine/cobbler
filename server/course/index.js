'use strict';

const {
  date,
  is,
  length,
  number,
  object,
  optional,
  refinement,
  string
} = require('superstruct');
const router = require('express').Router();
const bodyValidatorFactory = require('../shared/util/bodyValidatorFactory');
const ctrl = require('./course.controller');

const createStruct = object({
  name: string(),
  description: length(string(), 2, 50),
  categoryId: number(),
  startDate: optional(refinement(string(), 'Date', value => is(new Date(value), date()))),
  endDate: optional(refinement(string(), 'Date', value => is(new Date(value), date())))
});

router
  .post('/', bodyValidatorFactory(createStruct), ctrl.create)
  .get('/', ctrl.getAll)
  .get('/:id', ctrl.getCourseById)
  .patch('/:id', bodyValidatorFactory(createStruct), ctrl.update);

module.exports = {
  path: '/courses',
  router
};
