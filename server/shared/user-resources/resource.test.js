'use strict';

const { Course } = require('../database');
const { getCoursesByUser } = require('../user-resources/resource.controller');
const sinon = require('sinon');

describe('Resource service', () => {
  const req = { user: { email: 'test' } };
  const res = { json: jest.fn(() => res) };
  afterEach(function () {
    sinon.restore();
  });

  describe('Get resource by user id', () => {
    test('Should throw if user does not exist', async () => {
      sinon.stub(Course, 'findAll').throws();
      await expect(getCoursesByUser(req, res)).rejects.toThrow();
    });
    test('Should call json with an object with data key', async () => {
      sinon.stub(Course, 'findAll').callsFake(() => ({ test: 'passed' }));
      await getCoursesByUser(req, res);
      expect(res.json).toHaveBeenCalledWith({ data: { test: 'passed' } });
    });
  });
});
