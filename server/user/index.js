'use strict';

const { authenticate } = require('../shared/auth');
const router = require('express').Router();
const ctrl = require('./user.controller');

router
  .post('/', ctrl.create)
  .post('/login', authenticate('local'), ctrl.login);

module.exports = {
  path: '/users',
  router
};
