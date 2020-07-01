'use strict';

const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const { User } = require('../shared/database');

const userAttributes = ['firstName', 'lastName', 'email', 'password', 'role'];

function create(req, res) {
  const user = pick(req.body, userAttributes);
  user.password = bcrypt.hashSync(user.password, 10);
  return User.create({ ...user })
    .then(user => res.json({ data: user, offset: {} }));
}

module.exports = {
  create
};
