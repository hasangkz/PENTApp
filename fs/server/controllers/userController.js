const User = require('../models/userModel');
const asycHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.JWT_SECRET;

const handleToken = (id) => {
  return jwt.sign({ id }, key, {
    expiresIn: '30d',
  });
};

const register = asycHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Enter the require areas');
  }

  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400);
    throw new Error('Already exist email!');
  }

  const salt = await bcrypt.genSalt();
  const newPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: newPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: handleToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Kullanıcı oluşturulamadı.');
  }

  res.json({ mesaj: 'kayıt' });
});

const login = asycHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //! email değişkenimiz unique bir değişken olduğu için bütün databasede sadece bir tane var. Bu sebeple biz email'e göre
  //! filtreleme yapabiliriz.
  if (user && (await bcrypt.compare(password, user.password))) {
    //! böyle bir kullanıcımız var ise şimdi de parolalar uyuşuyor mu diye kontrol etmemiz gerekiyor.
    //! bunun için "(await bcrypt.compare(password, user.password))" kodunu kullanıyoruz.
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: handleToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('İnvalid email or password!');
  }
});

const getUser = asycHandler(async (req, res) => {
  const id = req.user.id;
  if (id) {
    const { _id, username, email } = await User.findById(id);
    res.status(200);
    res.json({
      id: _id,
      username,
      email,
    });
  } else {
    res.status(404);
    throw new Error('İnvalid user!');
  }
});

module.exports = {
  register,
  login,
  getUser,
};
