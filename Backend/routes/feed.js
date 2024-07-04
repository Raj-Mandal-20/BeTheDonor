const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.post('/create-request', isAuth,  feedController.createRequest);
router.get('/notification', isAuth, feedController.notification);
router.get('/all-blood-request', feedController.allBloodRequest);
router.post('/fetchUserByUserId', feedController.fetchUserDetails);


module.exports = router;
