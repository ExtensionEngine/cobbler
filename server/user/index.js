'use strict';

const router = require('express').Router();
const ctrl = require('./user.controller');

router
  .post('/', ctrl.create);

module.exports = {
  path: '/users',
  router
};
