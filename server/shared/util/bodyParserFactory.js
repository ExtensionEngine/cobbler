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

function reqBodyParserFactory(bodyName) {
  const bodyParser = parserMapper[bodyName];
  return function (req, res, next) {
    if (req.method === 'GET' || !bodyParser) return next();
    try {
      req[bodyName] = bodyParser(req.body);
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: err.message });
    }
    return next();
  };
}

module.exports = reqBodyParserFactory;

const parserMapper = {
  category: parseCategory,
  course: parseCourse,
  user: parseUser
};

function parseCategory(category) {
  const categoryStruct = masked(object({
    name: string()
  }));
  const parsedCategory = coerce(category, categoryStruct);
  assert(parsedCategory, categoryStruct);
  return parsedCategory;
}

function parseCourse(course) {
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

function parseUser(user) {
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
