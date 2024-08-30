const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Request = require("../model/Request");
const User = require("../model/User");
const nodemailer = require("nodemailer");
const Donor = require("../model/Donor");

exports.createRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const city = req.body.city;
  const state = req.body.state;
  const pin = req.body.pin;
  const userId = req.userId;
  const bloodGroup = req.body.bloodGroup;
  const bloodUnit = req.body.bloodUnit;
  const deadline = req.body.deadline;
  const district = req.body.district;
  const donationCenter = req.body.donationCenter;

  try {
    const request = new Request({
      city: city,
      state: state,
      pin: pin,
      bloodGroup: bloodGroup,
      bloodUnit: bloodUnit,
      userId: userId,
      deadline: deadline,
      district: district,
      donationCenter: donationCenter,
    });

    const user = await User.findById(userId);
    user.requests.push(request);

    await user.save();

    // notify all pepole
    const users = await User.find({ available: true, _id: { $ne: userId } });
    const recipients = users.map((user) => user.email);
    console.log(recipients);
    await notifyAll(bloodGroup, recipients);

    const bloodRequest = await request.save();
    console.log(bloodRequest);

    res.status(200).json({
      bloodRequest: bloodRequest,
      message: "Request Created Successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

async function notifyAll(bloodGroup, recipients) {
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
    to: recipients.join(","),
    subject: "[URGENT] Blood Needed",
    html: `
      <h2> A Patient Needed (${bloodGroup}) Blood, do you want to contribute? </h2>
    `,
    bcc: recipients.join(","),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

async function sendDonationEmail(userEmail) {
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
    subject: "[Accepted] Blood Donation",
    html: `
      <h2> Thank you for your blood donation</h2>
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

exports.allBloodRequest = async (req, res, next) => {
  try {
    const allBloodRequest = await Request.find();
    res.status(200).json({
      allBloodRequest: allBloodRequest,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.donationEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    await sendEMail();
    res.status(200).json({
      message: "Broadcast email Successful",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    console.log(user);
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.myProfile = async (req, res, next) => {
  try {
    const userProfile = await User.findById(req.userId);
    console.log(userProfile);
    res.status(200).json({
      myProfile: userProfile,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.requestHistory = async (req, res, next) => {
  try {
    const bloodRequests = await Request.find({ userId: req.userId });
    console.log(bloodRequests);
    res.status(200).json({
      bloodRequests: bloodRequests,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.acceptDonation = async (req, res, next) => {
  try {
    // donor increases
    // one time accept

    const { available } = await User.findById(req.userId);
    if (!available) {
      const error = new Error("You are not available to Donate!");
      throw error;
    }

    const requestId = req.body.requestId;
    const bloodRequest = await Request.findById(requestId);

    console.log("Request Id = ", requestId);
    // check if the user is already donated
    const donorExists = await Donor.findOne({
      requestId: requestId,
      userId: req.userId,
    });

    console.log("donor loggs", donorExists);

    if (donorExists) {
      const error = new Error("You have already donated for this request!");
      error.statusCode = 304;
      throw error;
    }

    const donor = new Donor({
      userId: req.userId,
      requestId: requestId,
      isDonated: true,
    });

    const donarCreated = await donor.save();

    bloodRequest.donors.push(donarCreated._id);
    await bloodRequest.save();

    const user = await User.findById(req.userId);
    user.donates.push(requestId);
    await user.save();
    await sendDonationEmail(user.email);

    console.log(bloodRequest);
    res.status(200).json({
      message: "Donation Accepted Successfully!",
      bloodRequest: bloodRequest,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.isDonated = async (req, res, next) => {
  try {
    const requestId = req.query.requestId;
    const userId = req.userId;

    const donor = await Donor.findOne({ requestId: requestId, userId: userId });
    console.log(donor);
    if (!donor) {
      res.status(200).json({
        isDonated: false,
      });
    }
    res.status(200).json({
      isDonated: donor.isDonated,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.donatedHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    let donates = await Promise.all(
      user.donates.map(async (reqId) => {
        const request = await Request.findById(reqId);
        console.log(request);
        return request;
      })
    );
    res.status(200).json({
      donates: donates,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.closeAccount = async (req, res, next) => {
  try {
    await Request.deleteMany({ userId: req.userId });
    await Donor.deleteMany({ userId: req.userId });
    await User.deleteOne({ _id: req.userId });

    res.status(200).json({
      message: "Account Closed Successfully",
      isAccountClosed: true,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const user = await User.findById({ _id: req.userId });
    if (sectionId === "1") {
      user.name = req.body.name;
      user.available = req.body.available;
    } else if (sectionId === "2") {
      user.phoneNumber = req.body.phoneNumber;
      user.gender = req.body.gender;
      user.bloodGroup = req.body.bloodGroup;
      user.dob = req.body.dob;
    } else if (sectionId === "3") {
      user.state = req.body.state;
      user.district = req.body.district;
      user.city = req.body.city;
      user.pin = req.body.pin;
    } else {
      // for Android APP
      user.gender = req.body.gender;
      user.state = req.body.state;
      user.district = req.body.district;
      user.city = req.body.city;
      user.pin = req.body.pin;
      user.available = req.body.available;
    }

    await user.save();
    res.status(200).json({
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.donarList = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    const requestBody = await Request.findById({ _id: requestId });
    console.log(requestBody.donors);

    let donors = await Promise.all(
      requestBody.donors.map(async (donorId) => {
        const donor = await Donor.findById({ _id: donorId });
        const user = await User.findById({ _id: donor.userId });
        return {
          name: user.name,
          email: user.email,
          state: user.state,
          city: user.city,
          district: user.district,
          pin: user.pin,
          phoneNumber: user.phoneNumber,
          blooodGroup: user.bloodGroup,
        };
      })
    );

    res.status(200).json({
      donors: donors,
      message: "Fetched Donors List Successfully",
      statusCode: 200,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteBloodRequest = async (req, res, next) => {
  try {

    const request = await Request.findById({ _id: req.query.requestId });

    if (!request) {
      const err = new Error("Blood Request Not Found!");
      err.statusCode = 404;
      throw err;
    }

    const donors = await Donor.find({ requestId: req.query.requestId });

    await Promise.all(
      donors.map(async ({ userId, requestId }) => {
        const user = await User.findById({ _id: userId });
        if (!user) {
          throw new Error(`User not found: ${userId}`);
        }
        user.donates = user.donates.filter((reqId) => {
          return reqId.toString() != requestId.toString();
        });
        await user.save();
      })
    );

    await Request.deleteOne({ _id: req.query.requestId });
    await Donor.deleteMany({ requestId: req.query.requestId });

    res.status(200).json({
      message: "Blood Request Deleted Successfully",
      statusCode: 200,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.closeAndOnBloodRequest = async (req, res, next) => {
  try {
    const request = await Request.findById({ _id: req.body.requestId });
    
    if (!request) {
      const err = new Error("Blood Request Not Found!");
      err.statusCode = 404;
      throw err;
    }

    request.isClosed = !request.isClosed;
    request.save();

    res.status(200).json({
      message: `Blood Request ${
        request.isClosed ? "Closed " : "Active "
      }Successfully`,
      statusCode: 200,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
