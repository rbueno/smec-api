const express = require('express');
const userController = require('../controllers/userController');
const ensureAuth = require('../middlewares/ensureAuth');

const router = express.Router();

router.post('/login', userController.login);

// router.use(ensureAuth);
router.get('/auth/linkedin/callback', userController.linkedInCallback)
module.exports = router;