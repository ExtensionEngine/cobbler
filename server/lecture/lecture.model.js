'use strict';

const { Model } = require('sequelize');

class Lecture extends Model {
  static fields({ STRING, TEXT, DATE, INTEGER }) {
    return {
      name: {
        type: STRING,
        validate: { len: [2, 50] }
      },
      description: {
        type: TEXT
      },
      courseId: {
        type: INTEGER,
        field: 'course_id'
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

  static associate({ Course }) {
    this.belongsTo(Course, {
      foreignKey: 'courseId',
      as: 'lecture'
    });
  }

  static options() {
    return {
      tableName: 'lectures',
      paranoid: true
    };
  }
}

module.exports = Lecture;
