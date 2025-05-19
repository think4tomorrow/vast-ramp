const express = require('express');
const router = express.Router();
const rampController = require('../controllers/rampController');
const auth = require('../middleware/auth');

router.post('/ramp-webhook', auth.verifyWebhook, rampController.handleWebhook);

module.exports = router;