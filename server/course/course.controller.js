'use strict';

const { BAD_REQUEST, CREATED, FORBIDDEN, NOT_FOUND } = require('http-status-codes');
const { Category, Course, Enrollment, User } = require('../shared/database');
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

function create(req, res) {
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'categoryId',
    'startDate',
    'endDate'
  ]);
  return Course.create(courseInfo)
    .then(course => course.addUser(req.user))
    .then(course => res.status(CREATED).json({ data: course }));
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
        attributes: ['firstName', 'lastName', 'email'],
        through: { model: Enrollment, attributes: [] }
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
      if (!course) return res.status(NOT_FOUND).send('Course not found');
      return res.json({ data: course });
    });
}

async function enroll(req, res) {
  const course = await Course.findByPk(req.params.id);
  if (!course.available) return res.status(FORBIDDEN).json('Course unavailable');
  await course.addUser(req.user);
  return res.status(CREATED).json('Successfully enrolled');
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
    return res.status(NOT_FOUND).json('Course does not exist');
  }
  return course
    .update(courseInfo)
    .then(course => res.status(CREATED).json({ data: course }));
}
