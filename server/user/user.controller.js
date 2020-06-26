'use strict';

const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const { User } = require('../shared/database');

const userAttributes = ['firstName', 'lastName', 'email', 'password', 'role'];

function create(req, res) {
  const user = pick(req.body, userAttributes);
  user.password = bcrypt.hashSync(user.password, 10);
  User.create({ ...user })
  .then(success => res.json(success))
  .catch(() => res.status(400).json('Invalid Params'));
}

module.exports = {
  create
};
