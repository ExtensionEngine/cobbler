'use strict';

const { Enrollment, Lecture } = require('../shared/database');
const pick = require('lodash/pick');

module.exports = {
  create,
  update
};

async function create(req, res) {
  const lectureInfo = pick(req.body, ['name', 'description', 'courseId']);
  try {
    // const isUserEnrolled = !!await Enrollment.findOne({
    //   where: { courseId: lectureInfo.courseId, userId: req.user.id }
    // });
    // if (!isUserEnrolled || req.user.role !== 'LECTURER') {
    //   res.status(403).send();
    // }
    const success = await Lecture.create({ ...lectureInfo });
    res.status(201).json(success);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function update(req, res) {
  const lectureInfo = pick(req.body, ['name', 'description']);
  try {
    const lecture = await Lecture.findByPk(req.params.id);
    const success = await lecture.update({ ...lectureInfo });
    res.status(201).json(success);
  } catch (err) {
    res.status(400).json(err);
  }
}
