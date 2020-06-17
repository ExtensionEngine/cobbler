'use strict';
const now = new Date();
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [
        {
          first_name: 'Learner',
          last_name: 'A',
          email: 'example1@gmail.com',
          password: bcrypt.hashSync('1234567', Number(process.env.SALT_ROUNDS)),
          role: 'LEARNER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Learner',
          last_name: 'B',
          email: 'example2@gmail.com',
          password: bcrypt.hashSync('1234567', Number(process.env.SALT_ROUNDS)),
          role: 'LEARNER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Learner',
          last_name: 'C',
          email: 'example3@gmail.com',
          password: bcrypt.hashSync('1234567', Number(process.env.SALT_ROUNDS)),
          role: 'LEARNER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Learner',
          last_name: 'D',
          email: 'example4@gmail.com',
          password: bcrypt.hashSync('1234567', Number(process.env.SALT_ROUNDS)),
          role: 'LEARNER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Lecturer',
          last_name: 'A',
          email: 'teacher@gmail.com',
          password: bcrypt.hashSync('1234567', Number(process.env.SALT_ROUNDS)),
          role: 'LECTURER',
          created_at: now,
          updated_at: now
        }
      ],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
