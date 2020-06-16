'use strict';

const auth = require('./auth');
const { authenticate } = require('./shared/auth');
const router = require('express').Router();
const user = require('./user');

router.use(auth.path, auth.router);
router.use(authenticate('jwt'));
router.get('/test', (req, res) => { res.send('Success'); });
router.use(user.path, user.router);

module.exports = router;
