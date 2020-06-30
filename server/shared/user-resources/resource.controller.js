'use strict';

const { Category, Course, User } = require('../database');

module.exports = {
  getCoursesByUser, isEnrolled
};

function getCoursesByUser(req, res) {
  const { email } = req.user;
  return Course.findAll({
    attributes: ['id', 'name', 'description', 'endDate', 'startDate'],
    include: [
      {
        model: User,
        where: { email },
        attributes: [],
        through: []
      },
      {
        model: Category,
        attributes: ['name']
      }
    ]
  })
    .then(course => res.json({ data: course, offset: {} }));
}

function isEnrolled(req, res) {
  const { email } = req.user;
  const { id } = req.params;
  return Course.findOne({
    where: { id },
    include: [
      {
        model: User,
        where: { email }
      }
    ]
  }).then(course => {
    if (course) {
      res.json({ enrolled: true });
    } else {
      res.json({ enrolled: false });
    }
  });
}
