'use strict';

const router = require('express').Router();
const ctrl = require('./resource.controller');

router
  .get('/courses', ctrl.getCoursesByUser)
  .get('/courses/:id', ctrl.isEnrolled);

module.exports = {
  path: '/me',
  router
};
