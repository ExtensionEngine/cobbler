'use strict';

const { BAD_REQUEST, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } = require('http-status-codes');
const { Category, Course, Enrollment, sequelize, User } = require('../shared/database');
const { HttpError } = require('../shared/error');
const { Op } = require('sequelize');
const pick = require('lodash/pick');

module.exports = {
  create,
  enroll,
  getAll,
  getCourseById,
  checkNameAvailability,
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

  if (!courseInfo.name || !courseInfo.description || isNaN(courseInfo.categoryId)) {
    throw new HttpError('The provided body is invalid', BAD_REQUEST);
  }
  const transaction = await sequelize.transaction();
  try {
    const course = await Course.create(courseInfo, { transaction });
    await course.addUser(req.user, { transaction });
    await transaction.commit();
    res.status(CREATED).json({ data: course });
  } catch (error) {
    await transaction.rollback();
    res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
}

function getAll(req, res) {
  const { available } = req.query;
  const query = {
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
    ]
  };
  if (available) {
    query.where = { endDate: { [Op.gte]: new Date() } };
  }
  return Course.findAll(query).then(course => res.json({ data: course }));
}

function getCourseById(req, res, next) {
  const { id } = req.params;
  if (!Number(id)) {
    throw new HttpError('ID is not a number', BAD_REQUEST);
  }

  return Course.findByPk(id, {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  })
    .then(course => {
      if (!course) return res.status(NOT_FOUND).send('Course not found');
      return res.json({ data: course });
    })
    .catch(next);
}

function enroll(req, res, next) {
  Course.findByPk(req.params.id).then(course => {
    if (!course.available) return res.status(FORBIDDEN).json('Course unavailable');
    return course.addUser(req.user);
  }).then(() => res.status(CREATED).json('Successfully enrolled'))
  .catch(next);
}

function update(req, res, next) {
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
  }).catch(next);
}

function checkNameAvailability({ body: { name } }, res, next) {
  if (!name) throw new HttpError('Invalid request body', BAD_REQUEST);

  return Course.findOne({ where: { name } }).then(course => {
    res.status(OK).json({ data: !course });
  }).catch(next);
}
