'use strict';

const { apiQueryParser, parseFilter, validateFilters } = require('../shared/util/apiQueryParser');

describe('Query parsing service', () => {
  describe('Filter validation', () => {
    const rawAttributes = { };
    const modelName = 'Test';

    it('Should return empty if params are valid', done => {
      const filters = { };
      expect(validateFilters(filters, rawAttributes, modelName)).toMatchObject({});
      done();
    });
    it('Should return error object if params are invalid', done => {
      const filters = { notEmpty: true };
      expect(validateFilters(filters, rawAttributes, modelName)).not.toEqual({});
      done();
    });
  });
});
