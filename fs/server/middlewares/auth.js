const asycHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.JWT_SECRET;

const handleUser = asycHandler(async (req, res, next) => {
  let encryptedToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      encryptedToken = req.headers.authorization.split(' ')[1];
      const token = jwt.verify(encryptedToken, key);
      req.user = await User.findById(token.id).select('-password');
      //! kullanıcı bilgilerini "req.user" kısmına atadık.
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Giriş yapılamadı!');
    }
  }
  if (!encryptedToken) {
    res.status(401);
    throw new Error('Token bulunamadı!');
  }
});

module.exports = handleUser;
