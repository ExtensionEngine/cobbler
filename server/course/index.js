'use strict';

const router = require('express').Router();
const ctrl = require('./course.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll)
  .get('/available', ctrl.getAvailableCourses)
  .get('/my-courses', ctrl.getCoursesByUser)
  .get('/:id', ctrl.getCourseById)
  .patch('/:id', ctrl.update)
  .post('/:id/enroll', ctrl.enroll);

module.exports = {
  path: '/courses',
  router
};
