'use strict';

const { create } = require('./user.controller');
const sinon = require('sinon');
const { User } = require('../shared/database');

describe('User Controller', () => {
  const mock = { id: 1, name: 'Test Person' };
  const req = { validatedBody: { password: 'testpassword' } };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };

  describe('Create new user', () => {
    test('Should call status with ok if user created and set data in response to user', async () => {
      sinon.stub(User, 'create').callsFake(() => mock);
      await create(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: mock }));
      User.create.restore();
    });
  });
});
