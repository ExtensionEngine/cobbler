'use strict';

const { Model } = require('sequelize');
const { roles } = require('../../config/server');

class User extends Model {
  static fields({ ENUM, STRING, TEXT, DATE }) {
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
        validate: { notEmpty: true, len: [5, 100] }
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
}

module.exports = User;
