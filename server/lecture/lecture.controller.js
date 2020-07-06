'use strict';

const { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const { Lecture } = require('../shared/database');
const pick = require('lodash/pick');

module.exports = {
  create,
  update
};

async function create(req, res) {
  const lectureInfo = pick(req.body, ['name', 'description', 'courseId']);
  try {
    if (!lectureInfo.name || isNaN(lectureInfo.courseId)) {
      throw new HttpError('Invalid request body', BAD_REQUEST);
    }
    const createdLecture = await Lecture.create({ ...lectureInfo });
    res.status(CREATED).json(createdLecture);
  } catch (e) {
    if (e.status) res.status(e.status).json({ error: e.message });
    res.status(INTERNAL_SERVER_ERROR).json();
  }
}

async function update(req, res) {
  const lectureInfo = pick(req.body, ['name', 'description']);
  try {
    const lecture = await Lecture.findByPk(req.params.id);
    const updatedLecture = await lecture.update({ ...lectureInfo });
    res.status(CREATED).json(updatedLecture);
  } catch (err) {
    res.status(BAD_REQUEST).json(err);
  }
}
