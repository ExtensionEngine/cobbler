'use strict';

const { authenticate } = require('./shared/auth');
const router = require('express').Router();
const user = require('./user');

router.use(user.path, user.router);
router.use(authenticate('jwt'));
router.get('/test', (req, res) => { res.send('Success'); });

module.exports = router;
