'use strict';

const auth = require('./auth');
const { authenticate } = require('./shared/auth');
const bodyParserFactory = require('./shared/util/bodyParserFactory');
const category = require('./category');
const course = require('./course');
const resource = require('./shared/user-resources');
const router = require('express').Router();
const user = require('./user');

router.use(auth.path, auth.router);
router.use(authenticate('jwt'));
router.use(user.path, bodyParserFactory('user'), user.router);
router.use(category.path, bodyParserFactory('category'), category.router);
router.use(course.path, bodyParserFactory('course'), course.router);
router.use(resource.path, resource.router);

module.exports = router;
