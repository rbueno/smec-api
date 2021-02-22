const express = require('express');
const ensureAuth = require('../middlewares/ensureAuth');
const ensureSME = require('../middlewares/ensureSME');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/all', postController.find);

router.use(ensureAuth, ensureSME);
router.post('/sme/fetchURL', postController.findByURL);
router.patch('/sme/stamp-it', postController.stampIt);
router.patch('/sme/stamp-remove', postController.stampRemove);
router.delete('/sme/post-remove', postController.postRemove);

module.exports = router;