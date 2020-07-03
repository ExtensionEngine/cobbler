'use strict';

const { Model } = require('sequelize');

class Category extends Model {
  static fields({ STRING, DATE }) {
    return {
      name: {
        type: STRING,
        validate: { len: [2, 50] },
        unique: true
      },
      createdAt: {
        type: DATE
      },
      updatedAt: {
        type: DATE
      },
      deletedAt: {
        type: DATE
      }
    };
  }

  static options() {
    return {
      tableName: 'categories',
      underscored: true,
      paranoid: true
    };
  }

  static associate({ Course }) {
    this.hasMany(Course, { foreignKey: 'categoryId' });
  }
}

module.exports = Category;
