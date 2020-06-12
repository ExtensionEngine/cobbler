'use strict';

const router = require('express').Router();
const ctrl = require('./user.controller');

router.get('/', ctrl.sayHi);
router.post('/', ctrl.addUser);

module.exports = {
  path: '/users',
  router
};
