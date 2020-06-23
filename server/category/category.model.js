'use strict';

const { Model } = require('sequelize');

class Category extends Model {
  static fields(DataTypes) {
    const { STRING, DATE } = DataTypes;
    return {
      name: {
        type: STRING,
        validate: { len: [2, 50] },
        unique: true
      },
      createdAt: {
        type: DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DATE,
        field: 'deleted_at'
      }
    };
  }

  static options() {
    return {
      tableName: 'categories'
    };
  }

  static associate({ Course }) {
    this.hasMany(Course, { as: 'categories', foreignKey: 'categoryId' });
  }
}

module.exports = Category;
