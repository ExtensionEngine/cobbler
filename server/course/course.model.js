'use strict';

const isAfter = require('date-fns/isAfter');
const { Model } = require('sequelize');

class Course extends Model {
  static fields({ STRING, TEXT, DATE, INTEGER }) {
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
        type: DATE,
        paranoid: true
      },
      startDate: {
        type: DATE
      },
      endDate: {
        type: DATE
      }
    };
  }

  static associate({ Category, User, Enrollment }) {
    this.belongsTo(Category, { foreignKey: 'categoryId' });
    this.belongsToMany(User, {
      through: Enrollment,
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
  }

  static options() {
    return {
      tableName: 'courses',
      underscored: true
    };
  }

  checkAvailability() {
    return isAfter(this.endDate, Date.now);
  }
}

module.exports = Course;
