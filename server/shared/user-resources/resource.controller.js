'use strict';

const { Category, Course, User } = require('../database');

module.exports = {
  getCoursesByUser,
  isEnrolled
};

async function getCoursesByUser(req, res) {
  const { email } = req.user;
  const course = await Course.findAll({
    attributes: ['id', 'name', 'description', 'endDate', 'startDate'],
    include: [
      {
        model: User,
        where: { email },
        attributes: [],
        through: [],
        as: 'user'
      },
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  });
  res.json({ data: course });
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
