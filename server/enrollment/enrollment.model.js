'use strict';

const { Model } = require('sequelize');

class Enrollment extends Model {
  static fields(DataTypes) {
    const { INTEGER, DATE } = DataTypes;
    return {
      courseId: {
        type: INTEGER,
        field: 'course_id'
      },
      userId: {
        type: INTEGER,
        field: 'user_id'
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
      tableName: 'enrollments'
    };
  }

  static associate({ Course, User }) {
    this.hasMany(User);
    this.hasMany(Course);
  }
}

module.exports = Enrollment;
