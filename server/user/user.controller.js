'use strict';
const { Course, User } = require('../shared/database');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');

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
  Course.findByPk(req.body.courseId)
    .then(found => {
      user.setCourses(found);
    })
    .catch(err => res.status(400).json(err)
    );
}

module.exports = {
  create,
  enroll
};
