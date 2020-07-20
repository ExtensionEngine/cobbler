'use strict';

const { Course } = require('../shared/database');
const { getAll } = require('../course/course.controller');
const sinon = require('sinon');

test('getAll returns all courses with status 200', async () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  sinon.stub(Course, 'findAll').callsFake(() => mock);
  const req = { query: {} };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
  await getAll(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: mock
  });
});
