'use strict';
const Course = require('./course.model');
const pick = require('lodash/pick');

module.exports = {
  create, getAll
};

function create(req, res) {
  const courseInfo = pick(req.body, ['name', 'description', 'categoryId']);
  Course.create({ ...courseInfo })
  .then(success => res.json(success))
  .catch(err => res.status(400).json(err));
}

function getAll(req, res) {
  Course.findAll()
    .then(success => res.json(success))
    .catch(err => res.json(err));
}
