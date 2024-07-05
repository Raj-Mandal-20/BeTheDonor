const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Request = require('../model/Request');
const User = require('../model/User');
const nodemailer = require("nodemailer");
const Donor = require('../model/Donor');

exports.createRequest = async (req, res, next)=>{
    
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
  const bloodUnit  = req.body.bloodUnit;
  const deadline = req.body.deadline;


  try{
      
    const request = new Request({
        city : city,
        state : state,
        pin : pin,
        bloodGroup : bloodGroup,
        bloodUnit : bloodUnit,
        userId : userId,
        deadline : deadline
    });    
    
    const user = await User.findById(userId);
    user.requests.push(request);

    await user.save();

    const bloodRequest = await request.save();
    console.log(bloodRequest);

    res.status(200).json({
        bloodRequest : bloodRequest,
        message: 'Request Created Successfully!'
    });
  }
  catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
    next(err);
  }
}


async function sendEMail() {

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
  
  // const recipients = ['hailchiku6@gmail.com', 'anioriginal4@gmail.com', 'souvikbh2@gmail.com', 'usingrajcseinfo@gmail.com'];
  const recipients = ['usingrajcseinfo@gmail.com'];

  const mailOptions = {
    from: `BeTheDonor <${process.env.EMAIL_FROM}>`,
    to: recipients.join(','),
    subject: "[URGENT] Blood Donation",
    html: `
      <h2> A Patient Needed O Negative (O-) Blood, Are You Available? </h2>
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

exports.notification = async(req, res, next)=>{
  try{
      await sendEMail();
      res.status(200).json({
          message : 'Broadcast email Successful'
      });
  }
  catch(err){
      console.log(err);
  }
}
exports.allBloodRequest = async(req, res, next)=>{
  try{
    const allBloodRequest = await Request.find();
    res.status(200).json({
      allBloodRequest : allBloodRequest
    });
  }
  catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.fetchUserDetails = async(req, res, next)=>{
  try{
    
    const user = await User.findById(req.body.userId);
    console.log(user);
    res.status(200).json({
      user : user
    });
  }
  catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.myProfile = async(req, res, next)=>{
  try{
    const userProfile = await User.findById(req.userId);
    console.log(userProfile);
    res.status(200).json({
      myProfile : userProfile
    });
  }
  catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

exports.requestHistory = async(req, res, next)=>{
  try{
    const bloodRequests = await Request.find({userId : req.userId});
    console.log(bloodRequests);
    res.status(200).json({
      bloodRequests : bloodRequests
    });
  }
  catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.acceptDonation = async (req, res, next)=>{
  try{
    // donor increases
    // one time accept
    
    const requestId = req.body.requestId;
    const bloodRequest = await Request.findById(requestId);
    bloodRequest.donors.push(req.userId);
    await bloodRequest.save();
    console.log(bloodRequest);
    res.status(200).json({
      message : 'Donation Accepted Successfully!',
      bloodRequest  :   bloodRequest
    });
    

  }
  catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}