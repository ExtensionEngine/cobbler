'use strict';

const { Sequelize, sequelize } = require('../shared/database');
const Course = require('../course/course.model');
const { Model } = require('sequelize');

class Category extends Model {}

Category.init({
  name: {
    type: Sequelize.STRING,
    validate: { len: [2, 50] },
    unique: true
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
}, { sequelize, tableName: 'categories' });

Category.hasMany(Course, { as: 'categories', foreignKey: 'categoryId' });

module.exports = Category;
