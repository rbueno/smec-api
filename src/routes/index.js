const express = require('express');
const user = require('./user');
const post = require('./post');
const session = require('./session');
const admin = require('./admin');

const router = express.Router();

router.use('/user', user);
router.use('/post', post);
router.use('/session', session);
router.use('/admin', admin);

module.exports = router;