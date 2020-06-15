'use strict';
const now = new Date();
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          first_name: 'Mate',
          last_name: 'Ivcic',
          email: 'example@mail.net',
          password: bcrypt.hashSync('12345', Number(process.env.SALT_ROUNDS)),
          role: 'LECTURER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Valentino',
          last_name: 'Lazaro',
          email: 'primjer@poruke.hr',
          password: bcrypt.hashSync('12345', Number(process.env.SALT_ROUNDS)),
          role: 'LECTURER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Franco',
          last_name: 'Baresi',
          email: 'mail@gmail.com',
          password: bcrypt.hashSync('678910', Number(process.env.SALT_ROUNDS)),
          role: 'LECTURER',
          created_at: now,
          updated_at: now
        },
        {
          first_name: 'Slavoljub',
          last_name: 'Mamic',
          email: 'ante@mate.hr',
          password: bcrypt.hashSync('678910', Number(process.env.SALT_ROUNDS)),
          role: 'LECTURER',
          created_at: now,
          updated_at: now
        }
      ],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
