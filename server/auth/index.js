'use strict';

const { NOT_FOUND, UNAUTHORIZED } = require('http-status-codes');
const auth = require('../shared/auth');
const { BadCredentialsError } = require('../shared/error');
const ctrl = require('./auth.controller');
const { EmptyResultError } = require('sequelize');
const router = require('express').Router();

router.post('/login', (req, res, next) => {
  auth.authenticate('local', null, (err, user, info) => {
    if (err instanceof EmptyResultError) {
      return res.send(NOT_FOUND, 'User not found');
    }
    if (err instanceof BadCredentialsError) {
      return res.send(UNAUTHORIZED, 'Wrong password');
    }
    next();
  })(req, res, next);
}, ctrl.login);

module.exports = {
  path: '/',
  router
};
