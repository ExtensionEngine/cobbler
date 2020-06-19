'use strict';

exports.up = queryInterface => queryInterface.renameTable('enrolments', 'enrollments');

exports.down = queryInterface => queryInterface.renameTable('enrollments', 'enrolments');
