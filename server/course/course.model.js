'use strict';

const fns = require('date-fns');
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
    if (fns.compareAsc(this.endDate, Date.now) === -1) {
      return false;
    }
    return true;
  }
}

module.exports = Course;
