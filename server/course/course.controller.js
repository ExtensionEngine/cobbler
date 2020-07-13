'use strict';

const { assert, date, number, object, optional, string } = require('superstruct');
const { BAD_REQUEST, CREATED, NOT_FOUND, OK } = require('http-status-codes');
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

async function create(req, res) {
  const course = await Course.create(parseCourse(req.body));
  const enrollment = await course.addUser(req.user);
  return res.status(CREATED).json({ data: { course, enrollment } });
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

async function getCourseById(req, res) {
  const { id } = req.params;
  if (!Number(id)) {
    throw new HttpError('ID is not a number', BAD_REQUEST);
  }
  const course = await Course.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ['name']
      }
    ]
  });
  if (!course) return res.status(NOT_FOUND).send('Course not found');
  return res.json({ data: course });
}

async function update(req, res) {
  const course = await Course.update(
    parseCourse(req.body),
    {
      where: {
        id: req.params.id
      },
      returning: true
    }
  );
  if (!course[1].length) {
    return res.status(NOT_FOUND).json('Course does not exist');
  }
  return res.status(CREATED).json({ data: course });
}

function parseCourse(course) {
  const courseStruct = object({
    name: string(),
    description: string(),
    startDate: optional(date()),
    endDate: optional(date()),
    categoryId: number()
  });
  const parsedCourse = pick(course,
    ['name', 'description', 'categoryId']);
  parsedCourse.startDate = course.startDate && new Date(course.startDate);
  parsedCourse.endDate = course.endDate && new Date(course.endDate);
  assert(parsedCourse, courseStruct);
  return parsedCourse;
}
