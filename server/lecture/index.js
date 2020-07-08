'use strict';

const router = require('express').Router();
const ctrl = require('./lecture.controller');

router
  .post('/', ctrl.create)
  .patch('/:id', ctrl.update)
  .get('/:id', ctrl.getLectureById);

module.exports = {
  path: '/lectures',
  router
};
