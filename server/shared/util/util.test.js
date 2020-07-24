/* eslint-disable quote-props */
'use strict';

const { apiQueryParser, validateFilters } = require('./apiQueryParser');
const { object, string } = require('superstruct');
const { errorHandler } = require('./middlewares');
const factory = require('./bodyValidatorFactory');
const isValidEmail = require('./isValidEmail');
const { logger } = require('../logger');
const { Op } = require('sequelize');
const sinon = require('sinon');

describe('Utility functions', () => {
  const req = { body: { test: 'test' }, query: { name: 'ts.test', limit: 6, offset: 0 } };
  const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
  const next = jest.fn(() => {});

  describe('EmailValidator', () => {
    test('Should return boolean(true) for valid email string', () => {
      expect(isValidEmail('test@test.com')).toBeTruthy();
    });
    test('Should return Boolean(false) for non-email string', () => {
      expect(isValidEmail('this is not an email')).toBeFalsy();
    });
    test('Should return Boolean(false) for email string without domain', () => {
      expect(isValidEmail('mail@mail')).toBeFalsy();
    });
    test('Should return Boolean(false) for email string without "@" sign', () => {
      expect(isValidEmail('mail.com')).toBeFalsy();
    });
    test('Should return Boolean(false) for email string without username', () => {
      expect(isValidEmail('@mail.com')).toBeFalsy();
    });
  });
  describe('Body Validator factory', () => {
    test('Should return a function that returns 400 with bad params', () => {
      const modelStructure = {};
      factory(modelStructure)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    test('Should return a function that adds the "validatedBody" field to the request object on success', () => {
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
        const err = { status: 404, message: 'Test error' };
        errorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(err.status);
        logger.error.restore();
      });
    });
    describe('Api Query parser', () => {
      test('Should transform the request query string into an object with orm operations', () => {
        apiQueryParser(req, res, () => {});
        expect(req.query).toStrictEqual(
          expect.objectContaining({
            pagination: {
              limit: 6,
              offset: 0
            },
            filters: {
              name: ({ [Op.iLike]: '%test%' })
            }
          })
        );
      });
      describe('Query parser Filter validation', () => {
        test("Should return error object if filters don't correspond to model structure", () => {
          const modelAttributes = ['id', 'name'];
          const errors = validateFilters({ categoryId: 2 }, modelAttributes, 'TestModelName');
          expect(errors).toHaveProperty('categoryId');
        });
      });
    });
  });
});
