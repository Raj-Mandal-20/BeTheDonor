const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.post('/create-request', isAuth,  feedController.createRequest);
router.get('/notification', feedController.notification);


module.exports = router;
