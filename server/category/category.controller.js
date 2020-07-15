'use strict';

const { assert, coerce, masked, object, string } = require('superstruct');
const Category = require('./category.model');
const { OK } = require('http-status-codes');

module.exports = {
  create, getAll
};

async function create(req, res) {
  const category = await Category.create(parseCategory(req.body));
  res.status(OK).json({ data: category });
}

async function getAll(req, res) {
  const categories = await Category.findAll();
  return res.status(OK).json({ data: categories });
}

function parseCategory(category) {
  const categoryStruct = masked(object({
    name: string()
  }));
  const parsedCategory = coerce(category, categoryStruct);
  assert(parsedCategory, categoryStruct);
  return parsedCategory;
}
