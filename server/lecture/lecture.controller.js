'use strict';

const { CREATED } = require('http-status-codes');
const { Lecture } = require('../shared/database');

module.exports = {
  create
};

async function create(req, res) {
  const lecture = await Lecture.create(req.validatedBody);
  return res.status(CREATED).json({ data: lecture });
}
