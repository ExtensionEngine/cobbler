'use strict';

const { Sequelize, sequelize } = require('../shared/database');
const Category = require('../category/category.model');
const { Model } = require('sequelize');

class Course extends Model {
  constructor() {
    super();
    this.hasOne(Category, {
      foreignKey: { name: 'categoryId', field: 'category_id' }
    });
  }
}

Course.init({
  name: {
    type: Sequelize.STRING,
    field: 'last_name',
    validate: { len: [2, 50] }
  },
  description: {
    type: Sequelize.TEXT,
    field: 'last_name',
    validate: { len: [2, 50] }
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

// Course.hasOne(Category, {
//   foreignKey: { name: 'categoryId', field: 'category_id' }
// });

module.exports = Course;
