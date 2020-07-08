'use strict';

const router = require('express').Router();
const ctrl = require('./teaching-element.controller');

router
  .post('/', ctrl.create);

module.exports = {
  path: '/teaching-elements',
  router
};
