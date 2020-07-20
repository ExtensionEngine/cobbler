'use strict';

const { CREATED, NOT_FOUND } = require('http-status-codes');
const { Lecture, TeachingElement } = require('../shared/database');

module.exports = {
  create,
  getLectureById
};

async function create(req, res) {
  const lecture = await Lecture.create(req.validatedBody);
  return res.status(CREATED).json({ data: lecture });
}

async function getLectureById(req, res) {
  const lecture = await Lecture.findByPk(req.params.id, {
    include: [{
      model: TeachingElement,
      as: 'teachingElements'
    }],
    order: [[{ model: TeachingElement, as: 'teachingElements' }, 'position', 'asc']]
  });
  if (!lecture) return res.status(NOT_FOUND).send('Lecture not found');
  return res.json({ data: lecture });
}
