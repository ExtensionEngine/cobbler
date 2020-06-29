'use strict';

const { Category, Course, User } = require('../shared/database');
const { BAD_REQUEST } = require('http-status-codes');
const { HttpError } = require('../shared/error');
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
  return Course.create({ ...courseInfo })
    .then(course => course.addUser(req.user))
    .then(course => res.status(201).json(course));
}

function getAll(req, res) {
  const { available } = req.query;
  // select = ['user','category']
  // /courses?select=user,category
  const query = {
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
  };
  if (available) {
    query.where = { endDate: { [Op.gte]: new Date() } };
  }
  return Course.findAll(query)
    .then(course => res.json({ data: course }));
}

function getCourseById(req, res) {
  const { id } = req.params;
  if (!Number(id)) {
    throw new HttpError('ID is not a number', BAD_REQUEST);
  }
  return Course.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ['name']
      }
    ]
  })
    .then(course => {
      if (!course) {
        res.status(404).send('Course not found');
      } else {
        res.json(course);
      }
    });
}

async function enroll(req, res) {
  const course = await Course.findByPk(req.params.id);
  if (course.checkAvailability()) {
    if (await course.addUser(req.user)) {
      res.status(201).json('Successfully enrolled');
    } else {
      res.status(400).send('Could not enroll');
    }
  } else res.status(204).json('Course unavailable');
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
  if (!course) {
    res.status(404).json('Course does not exist');
  }
  return course
    .update({ ...courseInfo })
    .then(course => res.status(201).json(course));
}
