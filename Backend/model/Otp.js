const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  emailId : {
    type : String,
    required: true
  },
  otp : {
    type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  }
}, {timestamps : true});

module.exports = mongoose.model("OTP", OptSchema);
