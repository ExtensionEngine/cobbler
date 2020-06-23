'use strict';

const { Sequelize, sequelize } = require('../shared/database');
const { Model } = require('sequelize');

class Course extends Model {
  associate(Category) {
    Course.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
  }
}

Course.init({
  name: {
    type: Sequelize.STRING,
    validate: { len: [2, 50] }
  },
  description: {
    type: Sequelize.TEXT,
    validate: { len: [2, 50] }
  },
  categoryId: {
    type: Sequelize.INTEGER,
    field: 'category_id'
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
}, { sequelize, tableName: 'courses' });

module.exports = Course;
