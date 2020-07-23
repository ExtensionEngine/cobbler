'use strict';

const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories',
      [
        {
          name: 'Information Technology',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Web Development',
          created_at: now,
          updated_at: now
        },
        {
          name: 'System Engineering',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Mathematical Computation',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Life Sciences',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Communication Skills',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Database Management',
          created_at: now,
          updated_at: now
        },
        {
          name: 'Physics',
          created_at: now,
          updated_at: now
        }
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
