'use strict';

const { BAD_REQUEST, CREATED } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const { Lecture } = require('../shared/database');
const pick = require('lodash/pick');

module.exports = {
  create,
  update
};

function create(req, res, next) {
  const lectureInfo = pick(req.body, ['name', 'description', 'courseId']);
  if (!lectureInfo.name || isNaN(lectureInfo.courseId)) {
    throw new HttpError('Invalid request body', BAD_REQUEST);
  }

  Lecture.create({ ...lectureInfo }).then(createdLecture => {
    res.status(CREATED).json({ data: createdLecture });
  }).catch(next);
}

function update(req, res, next) {
  const lectureInfo = pick(req.body, ['name', 'description']);
  if (isNaN(req.params.id)) {
    throw new HttpError('The provided course id is not a number', BAD_REQUEST);
  }

  Lecture.findByPk(req.params.id)
    .then(lecture => lecture.update({ ...lectureInfo }))
    .then(updatedLecture => {
      res.status(CREATED).json({ data: updatedLecture });
    })
    .catch(next);
}
