'use strict';

const { BAD_REQUEST, CREATED, NOT_FOUND } = require('http-status-codes');
const { Category, Course, Enrollment, User } = require('../shared/database');
const { HttpError } = require('../shared/error');
const isEmpty = require('lodash/isEmpty');
const { literal } = require('sequelize');
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
  const { id } = req.user;
  const errors = validateFilters(filters, Course.rawAttributes, Course.name);
  if (!isEmpty(errors)) return res.status(BAD_REQUEST).json({ errors });
  const { courseId, userId, createdAt } = Enrollment.rawAttributes;
  const enrollmentsQuery = `
    SELECT ${createdAt.field}
    FROM ${Enrollment.tableName} as Enrollment
    WHERE Enrollment.${userId.field} = ${id}
    AND Enrollment.${courseId.field} = "Course"."id"
  `;
  const query = {
    attributes: [
      [literal(`EXISTS(${enrollmentsQuery})`), 'isEnrolled'],
      ...Object.keys(Course.rawAttributes)
    ],
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }
    ],
    ...pagination,
    where: filters,
    subQuery: false,
    order: [literal('"isEnrolled"', 'DESC')]
  };
  return Course.findAll(query)
    .then(courses => {
      return res.json({ data: courses });
    })
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
      },
      {
        model: User,
        required: false,
        attributes: ['firstName', 'lastName', 'email', 'role']
      }
    ]
  })
    .then(course => {
      if (!course) return res.status(NOT_FOUND).send('Course not found');
      return res.json({ data: course });
    });
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
