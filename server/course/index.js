'use strict';

const router = require('express').Router();
const ctrl = require('./course.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll)
  .get('/available', ctrl.getAvailableCourses)
  .get('/my-courses', ctrl.getCoursesByUser)
  .get('/:id', ctrl.getCourseById)
  .post('/:id/enroll', ctrl.enroll)
  .post('/check-name', ctrl.checkNameAvailability);
  .patch('/:id', ctrl.update)

module.exports = {
  path: '/courses',
  router
};
