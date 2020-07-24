'use strict';

const { getCoursesByUser, isEnrolled } = require('../user-resources/resource.controller');
const { Course } = require('../database');
const sinon = require('sinon');

describe('Resource controller', () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  const req = { user: { id: 1, email: 'test' }, params: { id: 2 } };
  const res = { json: jest.fn(() => res) };

  describe('Get resource by user id', () => {
    test('Should throw if user does not exist', async () => {
      sinon.stub(Course, 'findAll').throws();
      await expect(getCoursesByUser(req, res)).rejects.toThrow();
      Course.findAll.restore();
    });
    test('Should call json with an object with data key', async () => {
      sinon.stub(Course, 'findAll').callsFake(() => (mock));
      await getCoursesByUser(req, res);
      expect(res.json).toHaveBeenCalledWith({ data: mock });
      Course.findAll.restore();
    });
  });
  describe('Check if user is enrolled', () => {
    test('Should call res.json with a boolean object', async () => {
      sinon.stub(Course, 'findOne').callsFake(() => mock);
      await isEnrolled(req, res);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        enrolled: true
      }));
      Course.findOne.restore();
    });
  });
});
