'use strict';

const { Sequelize, sequelize } = require('../shared/database');
const { Model } = require('sequelize');

class Enrolment extends Model {}

Enrolment.init({
  courseId: {
    type: Sequelize.INTEGER,
    field: 'course_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}, { sequelize, tableName: 'enrolments' });

module.exports = Enrolment;
