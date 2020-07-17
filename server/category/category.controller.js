'use strict';

const Category = require('./category.model');
const { OK } = require('http-status-codes');
const pick = require('lodash/pick');

module.exports = {
  create, getAll
};

async function create(req, res) {
  const category = await Category.create(pick(req.body, ['name']));
  return res.status(OK).json({ data: category });
}

async function getAll(req, res) {
  const categories = await Category.findAll();
  return res.status(OK).json({ data: categories });
}
