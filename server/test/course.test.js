'use strict';

const { Course } = require('../shared/database');
const { create } = require('../course/course.controller');

describe('Course Service', () => {
  describe('Create new course', () => {
    it('Should send status 201 for created course', async done => {
      jest.spyOn(Course, 'create').mockImplementation(() => {
        return { testCourse: 'Testing' };
      });
      jest.mock('res', () => {
        return {
          status: () => {
            console.log('Kurcina');
          }
        };
      });
      const enrollment = { testEnroll: 'Testing' };
      const res = {
        status: status => {
          console.log(status);
          return this;
        }
      };
      expect(create).toBeTruthy();

      done();
    });
  });
});
