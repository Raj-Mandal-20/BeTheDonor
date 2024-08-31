const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth");

router.get("/verifyemail/:verificationId", authController.verifyEmail);

router.post(
  "/signup",
  authController.signup
);
router.post("/signin", authController.signin);

router.post('/reset-password', authController.changePassword);
router.get('/verifyforgetPassword/:verifyPass', authController.verifyforgetPassword);
router.post('/forgetPassword', authController.forgetPassword);
module.exports = router;
