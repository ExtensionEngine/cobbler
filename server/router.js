'use strict';

const auth = require('./auth');
const { authenticate } = require('./shared/auth');
const category = require('./category');
const course = require('./course');
const lecture = require('./lecture');
const resource = require('./shared/user-resources');
const sse = require('./sse');
const router = require('express').Router();
const user = require('./user');

router.use(auth.path, auth.router);
router.use(authenticate('jwt'));
router.use(sse.path, sse.router);
router.use(user.path, user.router);
router.use(category.path, category.router);
router.use(course.path, course.router);
router.use(lecture.path, lecture.router);
router.use(resource.path, resource.router);

module.exports = router;
