'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { roles } = require('../../config/server');

class User extends Model {
  checkPassword(passwordAttempt) {
    return bcrypt.compare(passwordAttempt, this.password);
  }

  generateJWT() {
    const options = { expiresIn: '1d' };
    const payload = { sub: this.email };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  static fields(DataTypes) {
    return {
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        validate: { len: [2, 50] }
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        validate: { len: [2, 50] }
      },
      email: {
        type: DataTypes.STRING,
        set(email) {
          this.setDataValue('email', email.toLowerCase());
        },
        validate: { isEmail: true },
        unique: { msg: 'The specified email address is already in use.' }
      },
      bio: {
        type: DataTypes.TEXT
      },
      password: {
        type: DataTypes.STRING,
        validate: { notEmpty: true, len: [6, 100] }
      },
      role: DataTypes.ENUM(roles),
      avatarUrl: {
        type: DataTypes.TEXT,
        field: 'avatar_url'
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
    const { Course } = db;
    this.belongsToMany(Course, { through: 'enrollments', foreignKey: 'user_id' });
  }

  static options() {
    return {
      tableName: 'users'
    };
  }
}

module.exports = User;
