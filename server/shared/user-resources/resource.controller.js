'use strict';

const { Category, Course, User } = require('../database');

module.exports = {
  getCoursesByUser
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
    .then(success => res.json(success))
    .catch(err => res.status(400).json(err));
}
