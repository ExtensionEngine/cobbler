'use strict';

const { enums, length, object, string, struct } = require('superstruct');
const bodyValidatorFactory = require('../shared/util/bodyValidatorFactory');
const ctrl = require('./user.controller');
const router = require('express').Router();
const isValidEmail = require('../shared/util/isValidEmail');
const { roles } = require('../../config/server');

const email = struct('email', isValidEmail);
const createStruct = object({
  firstName: length(string(), 2, 50),
  lastName: length(string(), 2, 50),
  email: email,
  password: string(),
  role: enums(roles)
});

router
  .post('/', bodyValidatorFactory(createStruct), ctrl.create);
module.exports = {
  path: '/users',
  router
};
