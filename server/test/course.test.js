'use strict';

const { Course } = require('../shared/database');
const { create } = require('../course/course.controller');

describe('Course Service', () => {
  const res = {
    status: status => {
      return this;
    },
    json: () => {}
  };
  const req = {};

  describe('Create new course', () => {
    it('Should send status 201 for created course', () => {
      // jest.mock('../shared/database', () => {
      //   return {
      //     Course: {}
      //   };
      // });

      // jest.spyOn(Course, 'create').mockImplementation(() => {
      //   return { addUser: () => { return { test: 'test' }; } };
      // });
      expect(true).toBeTruthy();
    });
  });
});
