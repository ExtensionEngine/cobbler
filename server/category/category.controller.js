'use strict';

const Category = require('./category.model');
const { HttpError } = require('../shared/error');
const pick = require('lodash/pick');

module.exports = {
  create, getAll
};

function create(req, res) {
  Category.create(pick(req.body, ['name']))
    .then(success => res.json(success))
    .catch(err => {
      throw new HttpError(err, 500);
    });
}

function getAll(req, res) {
  Category.findAll()
    .then(success => res.json(success))
    .catch(err => res.json(err));
}
