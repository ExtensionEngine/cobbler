/* eslint-disable quote-props */
'use strict';

const { object, string } = require('superstruct');
const { errorHandler } = require('./middlewares');
const factory = require('./bodyValidatorFactory');
const isValidEmail = require('./isValidEmail');
const { logger } = require('../logger');
const sinon = require('sinon');

describe('Utility functions', () => {
  const req = { body: { test: 'test' } };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
  const err = { status: 404, message: 'Test error' };
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
      expect(req).toHaveProperty('validatedBody');
    });
  });
  describe('Middlewares', () => {
    describe('Error handler', () => {
      sinon.stub(logger, 'error').callsFake(() => {});

      test('Should call status with 500 if error is propagated', () => {
        errorHandler({}, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
      });
      test('Should call status with whatever error number was passed if present', () => {
        errorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(err.status);
      });
    });
  });
});
