'use strict';

const { Model } = require('sequelize');

class Enrollment extends Model {
  static fields({ INTEGER, DATE }) {
    return {
      courseId: {
        type: INTEGER,
        primaryKey: true
      },
      userId: {
        type: INTEGER,
        primaryKey: true
      },
      createdAt: {
        type: DATE
      },
      updatedAt: {
        type: DATE
      },
      deletedAt: {
        type: DATE,
        paranoid: true
      }
    };
  }

  static options() {
    return {
      tableName: 'enrollments',
      underscored: true
    };
  }

  static associate({ Course, User }) {
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'user_id' },
      as: 'user'
    });
    this.belongsTo(Course, {
      foreignKey: { name: 'courseId', field: 'course_id' },
      as: 'course'
    });
  }
}

module.exports = Enrollment;
