'use strict';

const isValidEmail = require('./isValidEmail');

describe('Utility functions', () => {
  describe('EmailValidator', () => {
    test('Should return string for valid email string', () => {
      expect(isValidEmail('test@test.com')).toBeTruthy();
    });
    test('Should return false for wrongly formatted email string', () => {
      expect(isValidEmail('gibberiSh')).toBeFalsy();
    });
  });
});
