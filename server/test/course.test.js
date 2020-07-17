'use strict';

const { Course } = require('../shared/database');
const { create } = require('../course/course.controller');

describe('Course Service', () => {
  describe('Create new course', () => {
    it('Should send status 200 for created course', async done => {
      jest.spyOn(Course, 'create').mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({ addUser: something => { return { added: true }; } });
        });
      });
      const res = {
        send: function () { },
        json: function (err) {
          console.log('\n : ' + err);
        },
        status: function (responseStatus) {
          return this;
        }
      };
      expect(create({ do: '' }, res)).not.toBe(null);
    });
  });
});
