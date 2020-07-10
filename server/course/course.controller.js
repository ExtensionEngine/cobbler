'use strict';

const { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } = require('http-status-codes');
const { Category, Course, Enrollment, sequelize, User } = require('../shared/database');
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
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'categoryId',
    'startDate',
    'endDate'
  ]);
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
  const courseInfo = pick(req.body, [
    'name',
    'description',
    'startDate',
    'endDate',
    'categoryId'
  ]);
  const course = await Course.update(
    courseInfo,
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
