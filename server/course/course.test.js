'use strict';

const { Course } = require('../shared/database');
const { getAll } = require('../course/course.controller');
const queryParser = require('../shared/util/apiQueryParser');
const sinon = require('sinon');

describe('Course service', () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  const req = { query: {} };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };

  describe('Get all courses', () => {
    test('Returns all courses with status 200', async () => {
      sinon.stub(Course, 'findAll').callsFake(() => mock);
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mock
      });
    });
    test('Returns 400 with faulty filters', async () => {
      const fakeValidator = sinon.fake.returns({ errors: true });
      sinon.replace(queryParser, 'validateFilters', fakeValidator);
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
