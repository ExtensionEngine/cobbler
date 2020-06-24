'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { roles } = require('../../config/server');

class User extends Model {
  static fields(DataTypes) {
    const { STRING, TEXT, DATE, ENUM } = DataTypes;
    return {
      firstName: {
        type: STRING,
        field: 'first_name',
        validate: { len: [2, 50] }
      },
      lastName: {
        type: STRING,
        field: 'last_name',
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
      role: ENUM(roles),
      avatarUrl: {
        type: TEXT,
        field: 'avatar_url'
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
      tableName: 'users'
    };
  }

  static associate({ Course, Enrollment }) {
    this.belongsToMany(Course,
      {
        through: Enrollment,
        foreignKey: { name: 'userId', field: 'user_id' }
      });
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
