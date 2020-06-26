'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'courses',
        'start_date',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'courses',
        'end_date',
        {
          type: Sequelize.DATE
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('courses', 'start_date'),
      queryInterface.removeColumn('courses', 'end_date')
    ]);
  }
};
