'use strict';

const router = require('express').Router();
const ctrl = require('./sse.controller');

router
  .get('/subscribe', ctrl.subscribe)
  .post('', ctrl.addPost);

module.exports = {
  path: '/sse',
  router
};
