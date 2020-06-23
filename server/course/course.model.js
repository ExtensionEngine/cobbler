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
      },
      startDate: {
        type: DATE,
        field: 'start_date'
      },
      endDate: {
        type: DATE,
        field: 'end_date'
      }
    };
  }

  static associate({ Category, User, Enrollment }) {
    this.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
    this.belongsToMany(User, {
      through: Enrollment,
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
  }

  static options() {
    return {
      tableName: 'courses'
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
