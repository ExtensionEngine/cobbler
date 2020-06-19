'use strict';
const bcrypt = require('bcrypt');
const Course = require('../course/course.model');
const pick = require('lodash/pick');
const User = require('./user.model');

const userAttributes = ['firstName', 'lastName', 'email', 'password', 'role'];

function create(req, res) {
  const user = pick(req.body, userAttributes);
  user.password = bcrypt.hashSync(user.password, 10);
  User.create({ ...user })
  .then(success => res.json(success))
  .catch(err => res.status(400).json(err));
}

function enroll(req, res) {
  const user = User.findByPk(req.params.id);
  return Course.findAll({
    include: {
      model: User
    }
  });
}

module.exports = {
  create, enroll
};
