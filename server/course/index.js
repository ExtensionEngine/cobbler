'use strict';

const router = require('express').Router();
const ctrl = require('./course.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll);

module.exports = {
  path: '/courses',
  router
};
