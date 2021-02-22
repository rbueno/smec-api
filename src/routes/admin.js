const express = require('express');
const adminController = require('../controllers/adminController');
const ensureAuth = require('../middlewares/ensureAuth');
const router = express.Router();

router.use(ensureAuth);
// without admin middleware only for Provi test
router.get('/sme-requests', adminController.smeRequest);
router.post('/sme-allow', adminController.smeAllow);

module.exports = router;