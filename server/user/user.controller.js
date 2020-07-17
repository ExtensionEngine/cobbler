'use strict';

const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const { User } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  req.validatedBody.password = bcrypt.hashSync(req.validatedBody.password, 10);
  const createdUser = await User.create(req.validatedBody);
  return res.status(OK).json({ data: createdUser });
}
