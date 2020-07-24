'use strict';
const { login } = require('./auth.controller');

describe('Authentication Controller', () => {
  const req = { user: { id: 1, name: 'Test Person', generateJWT: () => 'eyJhbGciOiJIUzI.....' } };
  const res = { json: jest.fn(() => res) };
  describe('Login', () => {
    test('Should call res.json with a valid json webtoken', () => {
      login(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: 'eyJhbGciOiJIUzI.....'
        })
      );
    });
  });
});
