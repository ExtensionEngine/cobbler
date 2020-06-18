'use strict';

const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('courses',
      [
        {
          name: 'VueJs Crash course',
          description: 'An introduction to the best Framework for Frontend Development',
          category_id: 2,
          created_at: now,
          updated_at: now
        },
        {
          name: 'Cisco exam course',
          description: 'The definitive way to prepare and master the materials to pass the Cisco exam',
          category_id: 3,
          created_at: now,
          updated_at: now
        },
        {
          name: 'Data Structures and Algorithms',
          description: 'Learn the most used and classic algorithms',
          category_id: 1,
          created_at: now,
          updated_at: now
        },
        {
          name: 'Applied Mathematics in programming',
          description: 'Learn to apply advanced mathematical concepts through code in Java',
          category_id: 4,
          created_at: now,
          updated_at: now
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
