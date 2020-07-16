'use strict';

const { BAD_REQUEST, CREATED, NOT_FOUND } = require('http-status-codes');
const { Lecture, TeachingElement } = require('../shared/database');
const { HttpError } = require('../shared/error');
const pick = require('lodash/pick');

module.exports = {
  create,
  update,
  getLectureById
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

function getLectureById(req, res, next) {
  const { id } = req.params;
  if (!Number(id)) {
    throw new HttpError('ID is not a number', BAD_REQUEST);
  }

  return Lecture.findByPk(id, {
    include: [{
      model: TeachingElement,
      as: 'teachingElements'
    }],
    order: [[{ model: TeachingElement, as: 'teachingElements' }, 'position', 'asc']]
  })
    .then(lecture => {
      if (!lecture) return res.status(NOT_FOUND).send('Lecture not found');
      return res.json({ data: lecture });
    })
    .catch(next);
}
