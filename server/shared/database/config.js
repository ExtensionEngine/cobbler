'use strict';

module.exports = {
  ...readConfig(),
  migrationStorageTableName: 'sequelize_meta'
};

function readConfig() {
  const DATABASE_URI = process.env.DATABASE_URI;
  if (DATABASE_URI) return { url: DATABASE_URI };

  throw new Error('Missing DATABASE_URI in the config');
}
