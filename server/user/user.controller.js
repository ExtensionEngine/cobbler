'use strict';
const bcrypt = require('bcrypt');
const User = require('./user.model');

function addUser(req, res) {
  const { firstName, lastName, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role
  })
  .then(success => res.json(success))
  .catch(err => res.json(err));
}

function login(req, res) {
  res.json('Successfully logged in');
}

module.exports = {
  addUser,
  login
};
