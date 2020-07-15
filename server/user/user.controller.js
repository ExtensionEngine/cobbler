'use strict';

const { assert, coerce, enums, masked, object, string } = require('superstruct');
const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const { roles } = require('../../config/server');
const { User } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  const user = parseUser(req.body);
  user.password = bcrypt.hashSync(user.password, 10);
  const createdUser = await User.create({ ...user });
  return res.status(OK).json({ data: createdUser });
}

function parseUser(user) {
  const userStruct = masked(object({
    firstName: string(),
    lastName: string(),
    email: string(),
    password: string(),
    role: enums(roles)
  }));
  const parsedUser = coerce(user, userStruct);
  assert(parsedUser, userStruct);
  return parsedUser;
}
