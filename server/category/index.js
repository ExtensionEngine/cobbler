'use strict';

const router = require('express').Router();
const ctrl = require('./category.controller');

router
  .post('/', ctrl.create)
  .get('/', ctrl.getAll);

module.exports = {
  path: '/categories',
  router
};
