'use strict';

const Category = require('./category.model');
const pick = require('lodash/pick');

module.exports = {
  create, getAll
};

function create(req, res) {
  return Category.create(pick(req.body, ['name']))
    .then(category => res.json({ data: category }));
}

function getAll(req, res) {
  return Category.findAll()
    .then(categories => res.json({ data: categories }));
}
