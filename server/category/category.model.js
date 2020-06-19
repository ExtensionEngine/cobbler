'use strict';

const { Model } = require('sequelize');

class Category extends Model {
  static fields(DataTypes) {
    return {
      name: {
        type: DataTypes.STRING,
        validate: { len: [2, 50] },
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    };
  }

  static associate(db) {
    const { Course } = db;
    this.hasMany(Course, { as: 'categories', foreignKey: 'categoryId' });
  }

  static options() {
    return {
      tableName: 'categories'
    };
  }
}

module.exports = Category;
