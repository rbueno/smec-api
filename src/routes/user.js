const express = require('express');
const userController = require('../controllers/userController');
const ensureAuth = require('../middlewares/ensureAuth');
const router = express.Router();

router.post('/create', userController.createUser);

router.use(ensureAuth);
router.get('/list', userController.getAll);
router.get('/applysme', userController.applysme);

module.exports = router;