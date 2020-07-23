'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { roles } = require('../../config/server');

class User extends Model {
  static fields({ STRING, TEXT, DATE, ENUM }) {
    return {
      firstName: {
        type: STRING,
        validate: { len: [2, 50] }
      },
      lastName: {
        type: STRING,
        validate: { len: [2, 50] }
      },
      email: {
        type: STRING,
        set(email) {
          this.setDataValue('email', email.toLowerCase());
        },
        validate: { isEmail: true },
        unique: { msg: 'The specified email address is already in use.' }
      },
      bio: {
        type: TEXT
      },
      password: {
        type: STRING,
        validate: { notEmpty: true, len: [6, 100] }
      },
      role: {
        type: ENUM(roles),
        defaultValue: 'LEARNER'
      },
      avatarUrl: {
        type: TEXT
      },
      createdAt: {
        type: DATE
      },
      updatedAt: {
        type: DATE
      },
      deletedAt: {
        type: DATE
      }
    };
  }

  static options() {
    return {
      tableName: 'users',
      underscored: true,
      paranoid: true
    };
  }

  static associate({ Course, Enrollment }) {
    this.belongsToMany(Course,
      {
        through: Enrollment,
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'course'
      });
    this.hasMany(Enrollment, { foreignKey: 'user_id' });
  }

  checkPassword(passwordAttempt) {
    return bcrypt.compare(passwordAttempt, this.password);
  }

  generateJWT() {
    const options = { expiresIn: '1d' };
    const payload = { sub: this.email, role: this.role };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
}

module.exports = User;
