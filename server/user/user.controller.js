'use strict';

const bcrypt = require('bcrypt');
const { OK } = require('http-status-codes');
const { User } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  const password = bcrypt.hashSync(req.validatedBody.password, 10);
  const data = { ...req.validatedBody, password };
  const user = await User.create(data);
  return res.status(OK).json({ data: user });
}
