'use strict';

const router = require('express').Router();
const ctrl = require('./course.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll)
  .get('/available', ctrl.getAvailableCourses)
  .post('/:id/enroll', ctrl.enroll);

module.exports = {
  path: '/courses',
  router
};
