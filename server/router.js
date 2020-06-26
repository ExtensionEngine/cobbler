'use strict';

const auth = require('./auth');
const { authenticate } = require('./shared/auth');
const category = require('./category');
const course = require('./course');
const router = require('express').Router();
const lecture = require('./lecture');
const user = require('./user');

router.use(auth.path, auth.router);
router.use(authenticate('jwt'));
router.use(user.path, user.router);
router.use(category.path, category.router);
router.use(course.path, course.router);
router.use(lecture.path, lecture.router);

module.exports = router;
