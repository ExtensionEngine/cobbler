'use strict';

const { create, getAll } = require('./category.controller');
const { Category } = require('../shared/database');
const sinon = require('sinon');

describe('Category Controller', () => {
  const mock = { id: 1, name: 'Test Category' };
  const req = { };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };

  describe('Create a category', () => {
    sinon.stub(Category, 'create').callsFake(() => (mock));
    test('Should call status with 200 and send an object with a data key if successful', async () => {
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: mock });
      Category.create.restore();
    });
  });
  describe('Get All Categories', () => {
    sinon.stub(Category, 'findAll').callsFake(() => ([mock]));

    test('Should call status with 200 and send an object with a data key and array if successful', async () => {
      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: [mock] });
      Category.findAll.restore();
    });
  });
});
