'use strict';

const { object, string } = require('superstruct');
const bodyValidatorFactory = require('../shared/util/bodyValidatorFactory');
const router = require('express').Router();
const ctrl = require('./category.controller');

const createStruct = object({
  name: string()
});

router
  .post('/', bodyValidatorFactory(createStruct), ctrl.create)
  .get('/', ctrl.getAll);

module.exports = {
  path: '/categories',
  router
};
