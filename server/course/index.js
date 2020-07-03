'use strict';

const router = require('express').Router();
const ctrl = require('./course.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll)
  .get('/:id', ctrl.getCourseById)
  .post('/:id/enroll', ctrl.enroll)
  .patch('/:id', ctrl.update)
  .post('/check-name', ctrl.checkNameAvailability);

module.exports = {
  path: '/courses',
  router
};
