const router = require('express').Router();
const { postUser, login } = require('../controllers/users');
const { postUserValidation, loginValidation } = require('../middlewares/validation');

// краш тест сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signup',
  postUserValidation,
  postUser,
);

router.post(
  '/signin',
  loginValidation,
  login,
);

module.exports = router;
