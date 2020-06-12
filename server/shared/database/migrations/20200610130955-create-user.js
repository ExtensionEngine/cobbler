'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      bio: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('ADMIN', 'LECTURER', 'LEARNER')
      },
      avatarUrl: {
        type: Sequelize.TEXT,
        field: 'avatar_url'
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
    return queryInterface.dropTable('Users');
  }
};
