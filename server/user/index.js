'use strict';

const router = require('express').Router();
const ctrl = require('./user.controller');

router
  .post('/', ctrl.create)
  .get('/:id/courses', (req, res) => res.json('Hello')) // TODO Implement getAll
  .post('/:id/courses', ctrl.enroll);

module.exports = {
  path: '/users',
  router
};
