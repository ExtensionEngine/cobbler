'use strict';

const router = require('express').Router();
const ctrl = require('./enrollment.controller');

router
  .post('/', ctrl.create);

module.exports = {
  path: '/enroll',
  router
};
