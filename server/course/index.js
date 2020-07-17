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
const bodyParserFactory = require('../shared/util/bodyParserFactory');
const ctrl = require('./course.controller');

const CreateStruct = object({
  name: string(),
  description: length(string(), 2, 50),
  categoryId: number(),
  startDate: optional(refinement(string(), 'Date', value => is(new Date(value), date()))),
  endDate: optional(refinement(string(), 'Date', value => is(new Date(value), date())))
});

router
  .post('/', bodyParserFactory(CreateStruct), ctrl.create)
  .get('/', ctrl.getAll)
  .get('/:id', ctrl.getCourseById)
  .patch('/:id', ctrl.update);

module.exports = {
  path: '/courses',
  router
};
