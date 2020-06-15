'use strict';

const { Sequelize, sequelize } = require('../shared/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { roles } = require('../../config/server');

class User extends Model {
  authenticate(passwordAttempt) {
    return bcrypt.compare(passwordAttempt, this.password)
      .then(result => {
        return result;
      });
  }

  generateJWT() {
    const options = {
      issuer: 'issuer',
      expiresIn: '1d'
    };
    const payload = { id: this.id, email: this.email };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
}
User.init({
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
    validate: { len: [2, 50] }
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
    validate: { len: [2, 50] }
  },
  email: {
    type: Sequelize.STRING,
    set(email) {
      this.setDataValue('email', email.toLowerCase());
    },
    validate: { isEmail: true },
    unique: { msg: 'The specified email address is already in use.' }
  },
  bio: {
    type: Sequelize.TEXT
  },
  password: {
    type: Sequelize.STRING,
    validate: { notEmpty: true, len: [5, 100] }
  },
  role: Sequelize.ENUM(roles),
  avatarUrl: {
    type: Sequelize.TEXT,
    field: 'avatar_url'
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}, { sequelize, modelName: 'users' });

module.exports = User;
