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


module.exports = router;
