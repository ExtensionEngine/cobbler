'use strict';

const { Category, Course, User } = require('../database');
const { getCoursesByUser } = require('../user-resources/resource.controller');
const sinon = require('sinon');

describe('Resource service', () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  const req = { query: {}, params: { id: 2 } };
  const res = { json: jest.fn(() => res), send: jest.fn(() => res), status: jest.fn(() => res) };
  afterEach(function () {
    sinon.restore();
  });

  describe('Get resource by user id', () => {
    test('Should throw if user does not exist', async () => {
      sinon.stub(Course, 'findAll').callsFake(() => { throw Error; });
      await getCoursesByUser(req, res);
      expect(getCoursesByUser).toThrow();
    }
    );
  });
});
