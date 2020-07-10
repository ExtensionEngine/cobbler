'use strict';

const config = require('./config');
const invoke = require('lodash/invoke');
const logger = require('../logger');
const path = require('path');
const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

// Models
/* eslint-disable require-sort/require-sort */
const User = require('../../user/user.model');
const Category = require('../../category/category.model');
const Course = require('../../course/course.model');
const Enrollment = require('../../enrollment/enrollment.model');
/* eslint-enable */

const sequelize = new Sequelize(config.url, config);

function initialize() {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: config.migrationStorageTableName
    },
    migrations: {
      path: path.join(__dirname, './migrations'),
      params: [
        sequelize.getQueryInterface(), sequelize.Sequelize
      ]
    }
  });

  return sequelize
    .authenticate()
    .then(() => umzug.up())
    .then(() => logger.info('👌 Connected to db'))
    .catch(() => logger.error('Failed to connect to db'));
}

const models = {
  User: defineModel(User),
  Category: defineModel(Category),
  Course: defineModel(Course),
  Enrollment: defineModel(Enrollment)
};

function defineModel(Model, connection = sequelize) {
  const { DataTypes } = connection.Sequelize;
  const fields = invoke(Model, 'fields', DataTypes, connection) || {};
  const options = invoke(Model, 'options') || {};
  Object.assign(options, { sequelize: connection });
  return Model.init(fields, options);
}

Object.values(models).forEach(model => {
  invoke(model, 'associate', models);
  addScopes(model, models);
});

function addScopes(model, models) {
  invoke(model, 'scopes', models);
}

const db = {
  Sequelize,
  sequelize,
  initialize,
  ...models
};

sequelize.model = name => sequelize.models[name] || db[name];

module.exports = db;
