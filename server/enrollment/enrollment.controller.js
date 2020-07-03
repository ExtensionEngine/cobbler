'use strict';

const { CREATED, FORBIDDEN } = require('http-status-codes');
const { Course } = require('../shared/database');

module.exports = { create };

async function create(req, res) {
  const { courseId } = req.body;
  const course = await Course.findByPk(courseId);
  if (!course.available) return res.status(FORBIDDEN).json('Course unavailable');
  await course.addUser(req.user);
  return res.status(CREATED).json('Successfully enrolled');
}
