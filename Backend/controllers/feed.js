const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Request = require('../model/Request');
const User = require('../model/User');

exports.createRequest = async (req, res, next)=>{
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Falied");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const city = req.body.city;
  const state = req.body.state;
  const pin = req.body.pin;
  const userId = req.body.userId;

  const bloodGroup = req.body.bloodGroup;
  const bloodUnit  = req.body.bloodUnit;
  let phoneNumber, email;

  User.findById(userId).then(user => {
    if(!user){
        throw new Error('User Not Found');
    }
    phoneNumber = user.phoneNumber;    
    email = user.email;
  })
  
//   console.log(req.userId);
  
  try{
      const request = new Request({
         name : name,
         city : city,
         state : state,
         pin : pin,
         bloodGroup : bloodGroup,
         bloodUnit : bloodUnit,
         phoneNumber : phoneNumber,
         email : email,
         userId : req.userId
      });    
      const reqId = await request.save();

      res.status(200).json({
        reqId : reqId,
        message: 'Request Created Successfully!'
      })
  }
  catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
    next(err);
  }
}