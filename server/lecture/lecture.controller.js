'use strict';

const { CREATED, OK } = require('http-status-codes');
const { Lecture } = require('../shared/database');

module.exports = {
  create, getByCourseId
};

async function create(req, res) {
  const lecture = await Lecture.create(req.validatedBody);
  return res.status(CREATED).json({ data: lecture });
}

async function getByCourseId(req, res) {
  const lectures = await Lecture.findAll({
    where: {
      courseId: req.params.id
    }
  });
  return res.status(OK).json({ data: lectures });
}
