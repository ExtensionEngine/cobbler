'use strict';

const auth = require('../shared/auth');
const ctrl = require('./auth.controller');
const { EmptyResultError } = require('sequelize');
const router = require('express').Router();
const { WrongCredentialsError } = require('../shared/error');

router.post('/login', (req, res, next) => {
  auth.authenticate('local', null, (err, user, info) => {
    if (err instanceof EmptyResultError) { return res.send(404, 'User not found'); }
    if (err instanceof WrongCredentialsError) { return res.send(401, 'Wrong password'); }

    req.login(user, err => {
      return err ? next(err) : next();
    });
  })(req, res, next);
}, ctrl.login);

module.exports = {
  path: '/',
  router
};
