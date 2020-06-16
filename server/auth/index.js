'use strict';

const auth = require('../shared/auth');
const ctrl = require('./auth.controller');
const router = require('express').Router();

router.post('/login', auth.authenticate('local'), ctrl.login);

module.exports = {
  path: '/',
  router
};
