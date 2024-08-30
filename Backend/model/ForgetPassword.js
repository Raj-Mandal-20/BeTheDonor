const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgetPasswordSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ForgetPassword', forgetPasswordSchema);