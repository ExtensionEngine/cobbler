'use strict';

const config = require('./config');
const path = require('path');
const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

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
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Failed to connect to db'));
}

module.exports = {
  Sequelize,
  sequelize,
  initialize
};
