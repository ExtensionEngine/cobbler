'use strict';

const { assert, date, number, object, optional, string } = require('superstruct');
const { BAD_REQUEST, CREATED, NOT_FOUND, OK } = require('http-status-codes');
const { Category, Course, Enrollment, User } = require('../shared/database');
const { HttpError } = require('../shared/error');
const { Op } = require('sequelize');
const pick = require('lodash/pick');

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

async function getAll(req, res) {
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
