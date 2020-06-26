'use strict';

const { Enrollment, Lecture } = require('../shared/database');
const pick = require('lodash/pick');

module.exports = {
  create
};

async function create(req, res) {
  const lectureInfo = pick(req.body, ['name', 'description', 'courseId']);
  try {
    const isUserEnrolled = !!await Enrollment.findOne({
      where: { courseId: lectureInfo.courseId, userId: req.user.id }
    });
    if (isUserEnrolled && req.user.role === 'LECTURER') {
      const success = await Lecture.create({ ...lectureInfo });
      res.status(201).json(success);
    }
    res.status(403).send();
  } catch (err) {
    res.status(400).send(err);
  }
}
