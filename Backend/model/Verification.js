const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const verificationSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    data : {
        name: {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        district : {
            type : String,
            required : true
        },
        dob : {
            type : Date,
            required : true
        },
        gender : {
            type : String,
            required : true
        },
        pin : {
            type : String, 
            required : true
        },
        phoneNumber : {
            type : String,
            required : true
        },
        bloodGroup : {
            type : String,
            required : true
        },
        available : {
            type : Boolean,
            required : true
        }       
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationSchema);
