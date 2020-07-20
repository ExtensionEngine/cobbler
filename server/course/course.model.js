'use strict';

const isAfter = require('date-fns/isAfter');
const { Model } = require('sequelize');

class Course extends Model {
  static fields({ STRING, TEXT, DATE, INTEGER, VIRTUAL }) {
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
        type: INTEGER
      },
      createdAt: {
        type: DATE
      },
      updatedAt: {
        type: DATE
      },
      deletedAt: {
        type: DATE
      },
      startDate: {
        type: DATE
      },
      endDate: {
        type: DATE
      },
      available: {
        type: VIRTUAL,
        get() {
          return isAfter(new Date(this.endDate), new Date());
        }
      }
    };
  }

  static associate({ Category, User, Enrollment }) {
    this.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    this.belongsToMany(User, {
      through: Enrollment,
      foreignKey: { name: 'courseId', field: 'course_id' },
      as: 'user'
    });
  }

  static options() {
    return {
      tableName: 'courses',
      underscored: true,
      paranoid: true
    };
  }
}

module.exports = Course;
