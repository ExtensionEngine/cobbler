'use strict';

const { BAD_REQUEST, CREATED, NOT_FOUND } = require('http-status-codes');
const { Category, Course, Enrollment, User } = require('../shared/database');
const { HttpError } = require('../shared/error');
const isEmpty = require('lodash/isEmpty');
const pick = require('lodash/pick');
const { validateFilters } = require('../shared/util/apiQueryParser');

module.exports = {
  create,
  getAll,
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

function getAll(req, res, next) {
  const { filters, pagination } = req.query;
  const errors = validateFilters(filters, Course.rawAttributes, Course.name);
  if (!isEmpty(errors)) return res.status(BAD_REQUEST).json({ errors });
  const query = {
    ...pagination,
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
  return Course.findAll(query)
    .then(courses => res.json({ data: courses }))
    .catch(next);
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
  }).then(course => {
    if (!course) return res.status(NOT_FOUND).send('Course not found');
    return res.json({ data: course });
  });
}

function update(req, res) {
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'startDate',
    'endDate',
    'categoryId'
  ]);
  return Course.update(
    courseInfo,
    {
      where: {
        id: req.params.id
      },
      returning: true
    }
  ).then(course => {
    if (!course[1].length) {
      return res.status(NOT_FOUND).json('Course does not exist');
    }
    return res.status(CREATED).json({ data: course });
  });
}
