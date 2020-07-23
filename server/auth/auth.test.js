'use strict';
const { login } = require('./auth.controller');

describe('Authentication service', () => {
  const req = {
    user: {
      generateJWT() {
        return 'eyJhbGciOiJIUzI.....';
      }
    }
  };
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
