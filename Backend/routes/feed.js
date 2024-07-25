const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

router.post("/create-request", isAuth, feedController.createRequest);
router.get("/all-blood-request", isAuth, feedController.allBloodRequest);
router.post("/fetchUserByUserId", isAuth, feedController.fetchUserDetails);
router.get("/my-profile", isAuth, feedController.myProfile);
router.get("/request-history", isAuth, feedController.requestHistory);
router.get("/donor", isAuth, feedController.isDonated);
router.post("/donation", isAuth, feedController.acceptDonation);
router.get("/donation-history",isAuth, feedController.donatedHistory);
router.post('/closeAccount', feedController.closeAccount);

module.exports = router;
