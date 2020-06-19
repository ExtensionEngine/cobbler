'use strict';

const { Model } = require('sequelize');

class Enrollment extends Model {
  static fields(DataTypes) {
    return {
      courseId: {
        type: DataTypes.INTEGER,
        field: 'course_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    };
  }

  static options() {
    return {
      tableName: 'enrollments'
    };
  }

  static associate(db) {
    const { Course, User } = db;
    this.belongsTo(Course, { foreignKey: 'courseId' });
    this.belongsTo(User, { foreignKey: 'userId' });
  }
}

module.exports = Enrollment;
