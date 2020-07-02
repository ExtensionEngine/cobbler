'use strict';

const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('courses',
      [
        {
          name: 'VueJs Crash course',
          description: 'An introduction to the best Frontend Framework',
          category_id: 2,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Cisco exam course',
          description: 'The definitive way to pass the Cisco exam',
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
          description: 'Learn to apply advanced mathematical concepts',
          category_id: 4,
          created_at: now,
          updated_at: now,
          start_date: new Date('2018-03-25'),
          end_date: new Date('2018-06-25')
        },
        {
          name: 'Study of human Hygiene',
          description: 'Learn to clean all the impurities away',
          category_id: 5,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'How to be a good mother-in-law',
          description: 'Learn to accept your son-in-law ',
          category_id: 5,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Study of known speeches',
          description: 'Learn hwo to structure your next public speech',
          category_id: 6,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'MySQL vs Postgres',
          description: 'Get to know the 2 most used dbms',
          category_id: 7,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Postgres procedures and functions',
          description: 'Enter the world of stored procedures and functions',
          category_id: 7,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Advanced pressure calculations',
          description: "It's dummy text anyway",
          category_id: 8,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        },
        {
          name: 'Applied Thermodynamics',
          description: 'Use the laws of thermodynamics to accomplish goals',
          category_id: 8,
          created_at: now,
          updated_at: now,
          start_date: new Date('2021-03-25'),
          end_date: new Date('2021-06-25')
        }
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
