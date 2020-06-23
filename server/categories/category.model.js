'use strict';

const { Model } = require('sequelize');

class Category extends Model {}

Category.init({
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
    validate: { len: [2, 50] }
  }
});

module.exports = Category;
