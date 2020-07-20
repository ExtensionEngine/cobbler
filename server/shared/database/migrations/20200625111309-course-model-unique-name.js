'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'courses',
      ['name'],
      {
        type: 'unique',
        name: 'unique_course_name'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'courses', 'unique_course_name'
    );
  }
};
