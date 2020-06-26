'use strict';

const { Category, Course, User } = require('../shared/database');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const pick = require('lodash/pick');

module.exports = {
  create,
  getAll,
  enroll,
  getCourseById,
  update
};

async function create(req, res) {
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'categoryId',
    'startDate',
    'endDate'
  ]);
  const { email } = req.user;
  const creator = await User.findOne({ where: { email } });
  Course.create({ ...courseInfo })
    .then(course => course.addUser(creator))
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json(err));
}

function getAll(req, res) {
  const { available } = req.query;
  const query = {
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email', 'role'],
        through: { attributes: [] }
      }
    ]
  };
  if (available) {
    query.where = { endDate: { [Op.gte]: Date.now() } };
  }
  Course.findAll(query)
    .then(success => res.json({ data: success }))
    .catch(err => res.status(400).json(err));
}

function getCourseById(req, res) {
  Course.findByPk(req.params.id, {
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: User,
        required: false,
        attributes: ['firstName', 'lastName', 'email'],
        where: {
          role: 'LECTURER'
        }
      }
    ]
  })
    .then(success => res.json(success))
    .catch(err => res.status(400).json(err));
}

async function enroll(req, res) {
  try {
    const { email } = req.user;
    const user = await User.findOne({ where: { email } });
    const course = await Course.findByPk(req.params.id);
    if (course.checkAvailability()) {
      await course.addUser(user);
      res.status(201).json('Successfully enrolled');
    } else res.status(204).json('Course unavailable');
  } catch (e) {
    res.status(400).json(e);
  }
}

async function update(req, res) {
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'startDate',
    'endDate',
    'categoryId'
  ]);
  const course = await Course.findByPk(req.params.id);
  course
    .update({ ...courseInfo })
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json(err));
}
