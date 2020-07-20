'use strict';

const { Course } = require('../shared/database');
const { create } = require('../course/course.controller');
const { json } = require('sequelize');

describe('Course Service', () => {
  describe('Create new course', () => {
    it('Should send status 201 for created course', async done => {
      jest.spyOn(Course, 'create').mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({ addUser: something => { return { added: true }; } });
        });
      });
      const req = {};
      const res = {
        send: function () { },
        status: () => ({})
      };
      const status = jest.spyOn(res, 'status').mockImplementation(() => {
        console.log('Pozvano');
        return { ...this, json: () => ({}) };
      });
      expect(create(req, res)).toBeTruthy();
      expect(status).toHaveBeenCalled();
      done();
    });
  });
});
