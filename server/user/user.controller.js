'use strict';

const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const { User } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  req.user.password = bcrypt.hashSync(req.user.password, 10);
  const createdUser = await User.create({ ...req.user });
  return res.status(OK).json({ data: createdUser });
}
