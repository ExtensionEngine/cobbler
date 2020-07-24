'use strict';

const { create, getByCourseId } = require('./lecture.controller');
const { Lecture } = require('../shared/database');
const sinon = require('sinon');

describe('Lecture Controller', () => {
  const req = { params: { id: 2 } };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
  const mock = { id: 1, name: 'New Lecture' };

  describe('Create new lecture', () => {
    test('Should call status with 201 on success', async () => {
      sinon.stub(Lecture, 'create').callsFake(() => mock);
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      Lecture.create.restore();
    });
  });
  describe('Get lectures by course id', () => {
    test('Should call status with 200 on success', async () => {
      sinon.stub(Lecture, 'findAll').callsFake(() => {});
      await getByCourseId(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      Lecture.findAll.restore();
    });
  });
});
