const router = require('express').Router();
const { register, login, getUser } = require('../controllers/userController');

const handleUser = require('../middlewares/auth');
//! auth middlewareni içe aktardık.

router.post('/', register);
router.post('/login', login);
router.get('/user', handleUser, getUser);
//! auth middleware "/user" ile "getUser" arasına girdi ve köprü görevi görüyor.
//! bu isteği kim atmış bakıyor ve istek atanın tokeni' var mı ? varsa yetkili bir işlem mi? kontrol ediyor

module.exports = router;
