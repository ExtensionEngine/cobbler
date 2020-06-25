'use strict';
const { Course, User } = require('../shared/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');

const userAttributes = ['firstName', 'lastName', 'email', 'password', 'role'];

function create(req, res) {
  const user = pick(req.body, userAttributes);
  user.password = bcrypt.hashSync(user.password, 10);
  User.create({ ...user })
  .then(success => res.json(success))
  .catch(err => res.status(400).json(err));
}

module.exports = {
  create
};
