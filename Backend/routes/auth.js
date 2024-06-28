const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require('../controllers/auth');

router.put("/signup", authController.signup);

module.exports = router;
