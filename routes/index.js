const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authMiddle = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.use(authRouter);

router.use(authMiddle);
router.use(usersRouter);
router.use(moviesRouter);

router.use('*', (res, req, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
