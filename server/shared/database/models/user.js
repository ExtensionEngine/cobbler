'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    biography: DataTypes.TEXT,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'TEACHER', 'LEARNER'),
    avatarUrl: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
