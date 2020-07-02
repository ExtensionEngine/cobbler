'use strict';

const { Category, Course, Enrollment, User } = require('../shared/database');
const { BAD_REQUEST } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const { Op } = require('sequelize');
const pick = require('lodash/pick');

module.exports = {
  create,
  getAll,
  enroll,
  getCourseById,
  checkNameAvailability,
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
    .then(course => res.status(201).json({ data: course }));
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
      if (!course) return res.status(404).send('Course not found');
      return res.json({ data: course });
    });
}

async function enroll(req, res) {
  const course = await Course.findByPk(req.params.id);
  if (!course.available) return res.status(403).json('Course unavailable');
  await course.addUser(req.user);
  return res.status(201).json('Successfully enrolled');
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
    return res.status(404).json('Course does not exist');
  }
  return course
    .update(courseInfo)
    .then(course => res.status(201).json({ data: course }));
}

async function checkNameAvailability(req, res) {
  try {
    const valid = !await Course.findOne({ where: { name: req.body.name } });
    res.status(200).json({ data: valid });
  } catch (e) {
    res.status(400).json(e);
  }
}
