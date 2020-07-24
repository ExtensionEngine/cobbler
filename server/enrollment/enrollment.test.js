'use strict';

const { Course } = require('../shared/database');
const { create } = require('./enrollment.controller');
const sinon = require('sinon');

describe('Enrollment Controller', () => {
  const mock = { id: 1, name: 'Test Category', addUser: () => {}, available: true };
  const req = { body: { courseId: 2 }, user: { id: 1, name: 'test' } };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
  describe('Create an enrollment entry', () => {
    sinon.stub(Course, 'findByPk').callsFake(() => mock);
    test('Should call status with 201 if params are valid', async () => {
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    test('Should call status with 403 if params are invalid', async () => {
      mock.available = false;
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      Course.findByPk.restore();
    });
  });
});
