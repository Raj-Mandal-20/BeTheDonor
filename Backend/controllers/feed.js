const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Request = require('../model/Request');
const User = require('../model/User');

exports.createRequest = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const userId = req.body.userId;
  const city = req.body.city;
  const state = req.body.state;
  const pin = req.body.pin;
  const bloodUnit = req.body.bloodUnit;
  const bloodGroup = req.body.bloodGroup;
  const deadline = req.body.deadline;
  let name, phoneNumber, email;

  let user = await User.findById(userId)
  phoneNumber = user.phoneNumber;
  email = user.email;
  name = user.name;

  try {
    const request = new Request({
      userId: userId,
      city: city,
      state: state,
      pin: pin,
      bloodUnit: bloodUnit,
      bloodGroup: bloodGroup,
      deadline: deadline,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
    });
    const reqId = await request.save();

    res.status(200).json({
      reqId: reqId,
      message: 'Request Created Successfully!'
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}