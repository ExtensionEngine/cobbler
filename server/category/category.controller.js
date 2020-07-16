'use strict';

const Category = require('./category.model');
const { OK } = require('http-status-codes');

module.exports = {
  create, getAll
};

async function create(req, res) {
  const category = await Category.create(req.category);
  res.status(OK).json({ data: category });
}

async function getAll(req, res) {
  const categories = await Category.findAll();
  return res.status(OK).json({ data: categories });
}
