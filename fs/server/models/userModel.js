const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter the username'],
    },
    email: {
      type: String,
      required: [true, 'Enter the email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter the password'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
