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
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Cisco exam course',
          description: 'The definitive way to prepare and master the materials to pass the Cisco exam',
          category_id: 3,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Data Structures and Algorithms',
          description: 'Learn the most used and classic algorithms',
          category_id: 1,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Applied Mathematics in programming',
          description: 'Learn to apply advanced mathematical concepts through code in Java',
          category_id: 4,
          created_at: now,
          updated_at: now,
          start_date: new Date('2018-03-25'),
          end_date: new Date('2018-06-25')
        }
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
