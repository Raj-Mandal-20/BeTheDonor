const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

router.post('/create-request', feedController.createRequest)


module.exports = router;
