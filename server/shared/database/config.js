'use strict';

module.exports = {
  ...readConfig(),
  migrationStorageTableName: 'sequelize_meta'
};

function readConfig(config = process.env) {
  const DATABASE_URI = config.DATABASE_URI;
  if (DATABASE_URI) return { url: DATABASE_URI };

  throw new Error(`Invalid \`DATABASE_URI\` provided: ${config.DATABASE_URI}`);
}
