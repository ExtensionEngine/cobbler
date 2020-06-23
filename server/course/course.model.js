'use strict';

const { Model } = require('sequelize');

class Course extends Model {
  static fields(DataTypes) {
    const { STRING, TEXT, DATE, INTEGER } = DataTypes;
    return {
      name: {
        type: STRING,
        validate: { len: [2, 50] }
      },
      description: {
        type: TEXT,
        validate: { len: [2, 50] }
      },
      categoryId: {
        type: INTEGER,
        field: 'category_id'
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

  static associate({ Category, User }) {
    this.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
    this.belongsToMany(User, { through: 'enrolments' });
  }

  static options() {
    return {
      tableName: 'courses'
    };
  }
}

module.exports = Course;
