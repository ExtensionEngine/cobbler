'use strict';
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const User = require('./user.model');

function create(req, res) {
  const user = pick(req.body, ['firstName', 'lastName', 'email', 'password', 'role']);
  user.password = bcrypt.hashSync(user.password, 10);
  User.create({ ...user })
  .then(success => res.json(success))
  .catch(err => res.json(err));
}

function login({ user }, res) {
  const token = user.generateJWT();
  res.json({ user: user.email, token });
}
module.exports = {
  create,
  login
};
