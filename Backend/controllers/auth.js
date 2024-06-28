const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const state = req.body.state;
  const city = req.body.city;
  const district = req.body.district;
  const pin = req.body.pin;
  const bloodGroup = req.body.bloodGroup;
  const available = req.body.available;

  bcrypt
    .hash(password, 12)
    .then((hashPw) => {
      const user = new User({
        name: name,
        email: email,
        password: password,
        state: state,
        city: city,
        district: district,
        pin: pin,
        bloodGroup: bloodGroup,
        available: available,
      });

      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "User Created!",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.signin = (req, res, next) => {};
