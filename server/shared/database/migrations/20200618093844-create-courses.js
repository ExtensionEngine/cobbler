'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: { model: 'categories', key: 'id' },
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        field: 'start_date'
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'end_date'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};
