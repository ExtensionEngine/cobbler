'use strict';

const { Model } = require('sequelize');

class Course extends Model {
  static fields(DataTypes) {
    return {
      name: {
        type: DataTypes.STRING,
        validate: { len: [2, 50] }
      },
      description: {
        type: DataTypes.TEXT,
        validate: { len: [2, 50] }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id'
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

  static associate(db) {
    const { Category, User } = db;
    this.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
    this.belongsToMany(User, { through: 'enrollments', foreignKey: 'course_id' });
  }

  static options() {
    return {
      tableName: 'courses'
    };
  }
}

module.exports = Course;
