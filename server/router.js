'use strict';

const auth = require('./auth');
const { authenticate } = require('./shared/auth');
const bodyValidatorFactory = require('./shared/util/bodyValidatorFactory');
const category = require('./category');
const course = require('./course');
const resource = require('./shared/user-resources');
const router = require('express').Router();
const user = require('./user');

router.use(auth.path, auth.router);
router.use(authenticate('jwt'));
router.use(user.path, bodyValidatorFactory('user'), user.router);
router.use(category.path, bodyValidatorFactory('category'), category.router);
router.use(course.path, bodyValidatorFactory('course'), course.router);
router.use(resource.path, resource.router);

module.exports = router;
