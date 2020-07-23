'use strict';

const { Category } = require('../shared/database');
const { OK } = require('http-status-codes');

module.exports = {
  create, getAll
};

async function create(req, res) {
  const category = await Category.create(req.validatedBody);
  res.status(OK).json({ data: category });
}

async function getAll(req, res) {
  const categories = await Category.findAll();
  return res.status(OK).json({ data: categories });
}
