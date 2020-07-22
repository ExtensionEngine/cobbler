'use strict';

const { Course, sequelize } = require('../shared/database');
const { create, getAll, getCourseById, update } = require('../course/course.controller');
const queryParser = require('../shared/util/apiQueryParser');
const sinon = require('sinon');

describe('Course service', () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  const req = { query: {}, params: { id: 2 } };
  const res = { json: jest.fn(() => res), send: jest.fn(() => res), status: jest.fn(() => res) };
  afterEach(function () {
    sinon.restore();
  });

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
      sinon.stub(queryParser, 'validateFilters').returns({ errors: true });
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Get course by id', () => {
    test("Should send not found if resource doesn't exist", async () => {
      sinon.stub(Course, 'findByPk').callsFake(() => { return null; });
      await getCourseById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    test('Should throw an error if called without a non-numeric param', async () => {
      const testReq = { ...req };
      testReq.params.id = 'nonsense';
      await expect(getCourseById(testReq, res)).rejects.toThrow();
    });
  });

  describe('Create a new course', () => {
    test('Should return 201 if successfully created', async () => {
      sinon.stub(sequelize, 'transaction').callsFake(fn => fn());
      sinon.stub(Course, 'create').callsFake(() => ({ addUser: () => {} }));
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('Update course', () => {
    test('Should return 404 if resource is not found', async () => {
      sinon.stub(Course, 'update').callsFake(() => []);
      await update(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    test('Should return 201 if resource is found', async () => {
      sinon.stub(Course, 'update').callsFake(() => [{ isUpdated: true }]);
      await update(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
