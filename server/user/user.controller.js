'use strict';
const User = require('./user.model');

function sayHi(req, res) {
  return res.send('Hi');
}

function addUser(req, res) {
  const { firstName, lastName, email, password, role } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    password,
    role
  })
  .then(success => res.json(success))
  .catch(err => res.json('NOPE', err));
}

module.exports = {
  addUser, sayHi
};
