'use strict';

const { BAD_REQUEST, CREATED, NOT_FOUND, OK } = require('http-status-codes');
const { Category, Course, Enrollment, sequelize, User } = require('../shared/database');
const { HttpError } = require('../shared/error');
const isEmpty = require('lodash/isEmpty');
const { validateFilters } = require('../shared/util/apiQueryParser');

module.exports = {
  create,
  getAll,
  getCourseById,
  checkNameAvailability,
  update
};

function create(req, res) {
  return sequelize.transaction(async transaction => {
    const course = await Course.create(req.validatedBody, { transaction });
    const enrollment = await course.addUser(req.user, { transaction });
    return res.status(CREATED).json({ data: { course, enrollment } });
  });
}

async function getAll(req, res) {
  const { filters, pagination } = req.query;
  const errors = validateFilters(filters, Course.rawAttributes, Course.name);
  if (!isEmpty(errors)) return res.status(BAD_REQUEST).json({ errors });
  const query = {
    ...pagination,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email'],
        through: { model: Enrollment, attributes: [] },
        as: 'user'
      }
    ],
    where: filters
  };
  const courses = await Course.findAll(query);
  return res.status(OK).json({ data: courses });
}

async function getCourseById(req, res) {
  const { id } = req.params;
  if (!Number(id)) {
    throw new HttpError('ID is not a number', BAD_REQUEST);
  }
  const course = await Course.findByPk(id, {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  });
  if (!course) return res.status(NOT_FOUND).send('Course not found');
  return res.json({ data: course });
}

async function update(req, res) {
  const [isUpdated, updatedCourses] = await Course.update(
    req.validatedBody,
    {
      where: {
        id: req.params.id
      },
      returning: true
    }
  );
  if (!isUpdated) return res.status(NOT_FOUND).json('Course does not exist');
  return res.status(CREATED).json({ data: updatedCourses });
}

function checkNameAvailability({ body: { name } }, res, next) {
  if (!name) throw new HttpError('No name value in the request body', BAD_REQUEST);

  return Course.findOne({ where: { name } }).then(course => {
    res.status(OK).json({ data: !course });
  }).catch(next);
}
