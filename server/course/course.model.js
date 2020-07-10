'use strict';

const { literal, Model } = require('sequelize');
const isAfter = require('date-fns/isAfter');

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
    this.belongsTo(Category, { foreignKey: 'categoryId' });
    this.belongsToMany(User, {
      through: Enrollment,
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
    this.hasMany(Enrollment, { foreignKey: 'course_id' });
  }

  static options() {
    return {
      tableName: 'courses',
      underscored: true,
      paranoid: true
    };
  }

  static scopes({ Enrollment }) {
    const { courseId, userId, createdAt } = Enrollment.rawAttributes;

    return [
      this.addScope('enrolledByUserId', id => {
        const enrollmentsQuery = `
        SELECT ${createdAt.field}
        FROM ${Enrollment.tableName} as Enrollment
        WHERE Enrollment.${userId.field} = ${id}
        AND Enrollment.${courseId.field} = "Course"."id"`;
        return {
          attributes: [
            [literal(`EXISTS(${enrollmentsQuery})`), 'isEnrolled'],
            ...Object.keys(Course.rawAttributes)
          ]
        };
      }
      )
    ];
  }
}

module.exports = Course;
