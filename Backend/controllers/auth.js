const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const nodemailer = require("nodemailer");
const Verification = require("../model/Verification");
const path = require("path");
const ForgetPassword = require("../model/ForgetPassword");
const { fsync } = require("fs");
require("dotenv").config();

async function sendVerifiedEmail(name, userEmail, verificationLink) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `BeTheDonor <${process.env.EMAIL_FROM}>`,
    to: userEmail,
    subject: "Verification Email",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #D6EFD8;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
              }
              .btn {
                  padding: 10px 20px;
                  color : white !important;
                  background-color: #1A5319;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }
              p{
                  font-size: 19px;
                  color: #1A5319;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hi, ${name}</h2>
              <p>Thank you for signing up with BeTheDonor. Please verify your email address by clicking the link below:</p>
              <br>
              <a href="${verificationLink}" class="btn">Verify Email</a>
          </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  console.log(req.body);

  try {
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
    const dob = req.body.dob;
    const gender = req.body.gender;

    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const error = new Error("Username or Email is already in use!");
      error.statusCode = 401;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const data = {
      name: name,
      email: email,
      password: hashPassword,
      state: state,
      city: city,
      district: district,
      pin: pin,
      bloodGroup: bloodGroup,
      available: available,
      phoneNumber: phoneNumber,
      dob: dob,
      gender: gender,
    };

    const token = jwt.sign(
      {
        data: data,
        email: email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    const verification = new Verification({
      token: token,
      data: data,
    });
    const host = req.get("host");
    const protocol = req.protocol;
    const verificationData = await verification.save();
    const verificationLink = `${protocol}://${host}/auth/verifyemail/${verificationData._id}`;

    await sendVerifiedEmail(name, email, verificationLink);

    res.status(200).json({
      message: "Verification Email Sent Successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const verificationId = req.params.verificationId;
    const verification = await Verification.findById(verificationId);

    if (!verification) {
      const file = path.join(__dirname, "..", "public", "linkExpired.html");
      res.sendFile(file);
    } else {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "emailVerified.html"
      );
      const data = verification.data;
      const user = new User(data);
      await user.save();
      await Verification.findByIdAndDelete(verificationId);

      res.sendFile(filePath, (err) => {
        if (err) {
          // Handle errors, such as file not found or permission issues
          console.error("Error sending file: ", err);
          res.status(err.status).end();
        } else {
          console.log("File sent successfully");
        }
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
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
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );
      req.userId = loadedUser._id;
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        available: loadedUser.available,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      const err = new Error("Email Not Found");
      err.statusCode = 404;
      throw err;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    const forgetPass = new ForgetPassword({
      userId: user._id,
      token: token,
    });

    const host = req.get("host");
    const protocol = req.protocol;
    const forgetData = await forgetPass.save();
    console.log(forgetData);
    const verificationLink = `${protocol}://${host}/auth/verifyforgetPassword/${forgetData._id}`;

    res.status(200).json({
      verificationLink: verificationLink,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.verifyforgetPassword = async (req, res, next) => {
  try {
    const verifyPassword = req.params.verifyPass;

    const found = await ForgetPassword.findById(verifyPassword);
    if (!found) {
      const err = new Error("Link Expired Try Again!");
      err.statusCode = 404;
      throw err;
    }
    res.render("auth/changePass", {
      token: verifyPassword,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const newPassword = req.body.newPassword;
    console.log(newPassword);
    const id = req.body.id;
    console.log("id", id);
    const forgetData = await ForgetPassword.findById(id);

    if(!forgetData){
      const err = new Error('Link Expired!');
      err.statusCode = 404;
      throw err;
    }
    console.log(forgetData);


    const user = await User.findById(forgetData.userId);
    const hashPass = await bcrypt.hash(newPassword, 12);
    user.password = hashPass;
    await user.save();
    await ForgetPassword.findByIdAndDelete(id);


    res.status(200).json({
      message: "Password Change Successfully",
      statusCode: 200,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
