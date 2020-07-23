/* eslint-disable quote-props */
'use strict';

const { object, string } = require('superstruct');
const factory = require('./bodyValidatorFactory');
const isValidEmail = require('./isValidEmail');

describe('Utility functions', () => {
  const req = { query: {}, params: { id: 2 }, body: { test: 'test' } };
  const res = { json: jest.fn(() => res), send: jest.fn(() => res), status: jest.fn(() => res) };
  const next = jest.fn(() => {});

  describe('EmailValidator', () => {
    test('Should return string for valid email string', () => {
      expect(isValidEmail('test@test.com')).toBeTruthy();
    });
    test('Should return false for wrongly formatted email string', () => {
      expect(isValidEmail('gibberiSh')).toBeFalsy();
    });
  });
  describe('Body Validator factory', () => {
    test('Should return a function that returns 400 with bad params', () => {
      factory({})(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    test('Should return a function that calls next on success', () => {
      const testStruct = object({
        test: string()
      });
      factory(testStruct)(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
