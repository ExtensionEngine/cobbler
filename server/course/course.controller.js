'use strict';
const { Category, Course, User } = require('../shared/database');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const pick = require('lodash/pick');

module.exports = {
  create,
  getAll,
  enroll,
  getAvailableCourses,
  getCourseById,
  getCoursesByUser,
  checkNameAvailability
  update
};

async function create(req, res) {
  const courseInfo = pick(req.body, ['name', 'description', 'categoryId', 'startDate', 'endDate']);
  const email = jwt.decode(req.get('Authorization').slice(4)).sub;
  const creator = await User.findOne({ where: { email } });
  Course.create({ ...courseInfo })
  .then(course => course.addUser(creator))
  .then(success => res.status(201).json(success))
  .catch(err => res.status(400).json(err));
}

function getAll(req, res) {
  Course.findAll({
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email'],
        through: { attributes: [] }
      }
    ]
  })
    .then(success => res.json({ data: success }))
    .catch(err => res.status(400).json(err));
}

function getCourseById(req, res) {
  Course.findByPk(req.params.id, {
    include: [
      {
        model: Category,
        attributes: ['name']
      }
    ]
  })
  .then(success => res.json(success))
  .catch(err => res.status(400).json(err));
}

function getAvailableCourses(req, res) {
  Course.findAll({
    where: {
      endDate: {
        [Op.gte]: Date.now()
      }
    },
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email'],
        through: { attributes: [] }
      }
    ]
  }).then(success => res.json({ data: success }))
  .catch(err => res.status(400).json(err));
}

async function getCoursesByUser(req, res) {
  try {
    const email = jwt.decode(req.get('Authorization').slice(4)).sub;
    return Course.findAll({
      attributes: ['id', 'name', 'description', 'endDate', 'startDate'],
      include: [{
        model: User,
        where: { email },
        attributes: [],
        through: []
      },
      {
        model: Category,
        attributes: ['name']
      }]
    })
    .then(success => res.json(success))
    .catch(err => res.status(400).json(err));
  } catch (e) {
    res.status(400).json(e);
  }
}

async function enroll(req, res) {
  try {
    const email = jwt.decode(req.get('Authorization').slice(4)).sub;
    const user = await User.findOne({ where: { email } });
    const course = await Course.findByPk(req.params.id);
    if (course.checkAvailability()) {
      course.addUser(user);
      res.status(201).json('Successfully enrolled');
    } else res.status(204).json('Course unavailable');
  } catch (e) {
    res.status(400).json(e);
  }
}

async function update(req, res) {
  const courseInfo = pick(req.body, ['name', 'description', 'startDate', 'endDate', 'categoryId']);
  const course = await Course.findByPk(req.params.id);
  course.update({ ...courseInfo })
  .then(success => res.status(201).json(success))
  .catch(err => res.status(400).json(err));
}

async function checkNameAvailability(req, res) {
  try {
    const valid = !await Course.findOne({ where: { name: req.body.name } });
    res.status(200).json({ valid });
  } catch (e) {
    res.status(400).json(e);
  }
}
