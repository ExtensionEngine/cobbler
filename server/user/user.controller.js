'use strict';

const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const pick = require('lodash/pick');
const { User } = require('../shared/database');

const userAttributes = ['firstName', 'lastName', 'email', 'password', 'role'];

async function create(req, res) {
  const user = pick(req.body, userAttributes);
  user.password = bcrypt.hashSync(user.password, 10);
  const createdUser = await User.create({ ...user });
  return res.status(OK).json({ data: createdUser });
}

module.exports = {
  create
};
