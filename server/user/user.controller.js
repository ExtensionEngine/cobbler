'use strict';

const { assert, enums, object, string } = require('superstruct');
const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const pick = require('lodash/pick');
const { roles } = require('../../config/server');
const { User } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  const user = parseUser(req.body);
  user.password = bcrypt.hashSync(user.password, 10);
  const createdUser = await User.create({ ...user });
  res.status(OK).json({ data: createdUser });
}

function parseUser(user) {
  const userStruct = object({
    firstName: string(),
    lastName: string(),
    email: string(),
    password: string(),
    role: enums(roles)
  });
  const parsedUser = pick(user,
    ['firstName', 'lastName', 'email', 'password', 'role']);
  assert(parsedUser, userStruct);
  return parsedUser;
}
