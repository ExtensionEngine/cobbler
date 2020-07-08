'use strict';

const { Model } = require('sequelize');
const { teachingElements } = require('../../config/server');

class TeachingElement extends Model {
  static fields({ STRING, ENUM, DATE, INTEGER, JSONB }) {
    return {
      name: {
        type: STRING,
        validate: { len: [2, 50] }
      },
      label: {
        type: STRING,
        validate: { len: [0, 30] }
      },
      type: {
        type: ENUM(teachingElements)
      },
      data: {
        type: JSONB
      },
      lectureId: {
        type: INTEGER,
        field: 'lecture_id'
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

  static associate({ Lecture }) {
    this.belongsTo(Lecture, {
      foreignKey: 'lectureId',
      as: 'teachingElement'
    });
  }

  static options() {
    return {
      tableName: 'teaching_elements',
      paranoid: true
    };
  }
}

module.exports = TeachingElement;
