'use strict';

const router = require('express').Router();
const ctrl = require('./user.controller');

router.get('/', ctrl.sayHi);

module.exports = {
  path: '/users',
  router
};
