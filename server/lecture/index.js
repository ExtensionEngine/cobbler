'use strict';

const router = require('express').Router();
const ctrl = require('./lecture.controller');

router
  .post('/', ctrl.create);

module.exports = {
  path: '/lectures',
  router
};
