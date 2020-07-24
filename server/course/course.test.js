'use strict';

const { Course, sequelize } = require('../shared/database');
const { create, getAll, getCourseById, update } = require('../course/course.controller');
const sinon = require('sinon');

describe('Course Controller', () => {
  const mock = [{ id: 1, name: 'Course' }, { id: 1, name: 'Course2' }];
  const req = { query: { }, params: { id: 2 }, user: { id: 1 } };
  const res = { json: jest.fn(() => res), send: jest.fn(() => res), status: jest.fn(() => res) };
  sinon.stub(Course, 'scope').callsFake(() => { return Course; });

  describe('Get all courses', () => {
    sinon.stub(Course, 'findAll').callsFake(() => mock);
    test('Returns all courses with status 200', async () => {
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mock
      });
    });
    test('Returns 400 with faulty filters', async () => {
      req.query.filters = { propertyNotInModel: '' };
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      Course.findAll.restore();
    });
  });

  describe('Get course by id', () => {
    test("Should send not found if resource doesn't exist", async () => {
      sinon.stub(Course, 'findByPk').callsFake(() => { return null; });
      await getCourseById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      Course.findByPk.restore();
    });
    test('Should return an object with data key on success', async () => {
      sinon.stub(Course, 'findByPk').callsFake(() => { return mock[0]; });
      await getCourseById(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: mock[0]
        })
      );
      Course.findByPk.restore();
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
      sequelize.transaction.restore();
      Course.create.restore();
    });
  });

  describe('Update course', () => {
    test('Should return 404 if resource is not found', async () => {
      sinon.stub(Course, 'update').callsFake(() => []);
      await update(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      Course.update.restore();
    });
    test('Should return 201 if resource is found', async () => {
      sinon.stub(Course, 'update').callsFake(() => [{ isUpdated: true }]);
      await update(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      Course.update.restore();
    });
  });
});
