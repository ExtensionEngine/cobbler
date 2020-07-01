'use strict';

const { Category, Course, Enrollment, User } = require('../shared/database');
const { BAD_REQUEST } = require('http-status-codes');
const { HttpError } = require('../shared/error');
const isEmpty = require('lodash/isEmpty');
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
    .then(course => res.status(201).json({ data: course }));
}

async function getAll(req, res) {
  const { filters } = req.query;
  const errors = validateFilters(filters, Course);
  if (!isEmpty(errors)) return res.status(BAD_REQUEST).json({ errors });
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
    ],
    where: filters
  };
  const courses = await Course.findAll(query);
  return res.json({ data: courses });
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

function validateFilters(filters, model) {
  const errors = {};
  const validAttributes = Object.keys(model.rawAttributes);
  const filteredAttributes = Object.keys(filters);
  filteredAttributes.forEach(it => {
    if (validAttributes.includes(it)) return;
    errors[it] = `Attribute doesn't exist on "${model.name}" resource.`;
  });
  return errors;
}
