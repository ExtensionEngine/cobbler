'use strict';

const {
  assert,
  coerce,
  coercion,
  date,
  enums,
  masked,
  number,
  object,
  optional,
  string
} = require('superstruct');
const { BAD_REQUEST } = require('http-status-codes');
const { roles } = require('../../../config/server');

function reqBodyValidatorFactory(modelName) {
  const modelValidator = validatorMapper[modelName];
  return function (req, res, next) {
    if (req.method === 'GET' || !modelValidator) return next();
    try {
      req[modelName] = modelValidator(req.body);
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: err.message });
    }
    return next();
  };
}

module.exports = reqBodyValidatorFactory;

const validatorMapper = {
  category: validateCategory,
  course: validateCourse,
  user: validateUser
};

function validateCategory(category) {
  const categoryStruct = masked(object({
    name: string()
  }));
  const parsedCategory = coerce(category, categoryStruct);
  assert(parsedCategory, categoryStruct);
  return parsedCategory;
}

function validateCourse(course) {
  const coerceDate = coercion(optional(date()), value => value && new Date(value));
  const courseStruct = object({
    name: string(),
    description: string(),
    categoryId: number()
  });
  const parsedCourse = coerce(course, masked(courseStruct));
  assert(parsedCourse, courseStruct);
  parsedCourse.startDate = coerce(course.startDate, coerceDate);
  parsedCourse.endDate = coerce(course.endDate, coerceDate);
  return parsedCourse;
}

function validateUser(user) {
  const userStruct = masked(object({
    firstName: string(),
    lastName: string(),
    email: string(),
    password: string(),
    role: enums(roles)
  }));
  const parsedUser = coerce(user, userStruct);
  assert(parsedUser, userStruct);
  return parsedUser;
}
