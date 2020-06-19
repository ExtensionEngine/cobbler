'use strict';

const config = require('./config');
const forEach = require('lodash/forEach');
const invoke = require('lodash/invoke');
const path = require('path');
const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

const sequelize = new Sequelize(config.url, config);

// Require models.
/* eslint-disable require-sort/require-sort */
const User = require('../../user/user.model');
const Category = require('../../category/category.model');
const Course = require('../../course/course.model');
const Enrollment = require('../../enrollment/enrollment.model');
/* eslint-enable */

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
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Failed to connect to db'));
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

forEach(models, model => {
  invoke(model, 'associate', models);
});

module.exports = {
  Sequelize,
  sequelize,
  initialize,
  ...models
};
