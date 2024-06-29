const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.signup = async (req, res, next) => {
  console.log("signup");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const state = req.body.state;
  const city = req.body.city;
  const district = req.body.district;
  const pin = req.body.pin;
  const bloodGroup = req.body.bloodGroup;
  const available = req.body.available;
  const phoneNumber = req.body.phoneNumber;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return bcrypt.hash(password, 12);
      } else throw new Error("Username or Email is already in use!");
    })
    .then((hashPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashPassword,
        state: state,
        city: city,
        district: district,
        pin: pin,
        bloodGroup: bloodGroup,
        available: available,
        phoneNumber : phoneNumber
      });
      // sendEMail(username, email);
      // console.log("sendemil Line Crossed!");
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "User Created!",
        userId: result._id,
      });
    })
    .catch((err) => next(err));
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("No Account Found with this " + email);
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "somesupersecret",
        { expiresIn: "1h" }
      );
      req.userId = loadedUser._id;
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
