const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authMiddle = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/errorMessages');

router.use(authRouter);

router.use(authMiddle);
router.use(usersRouter);
router.use(moviesRouter);

router.use('*', (res, req, next) => {
  next(new NotFoundError(errorMessages.PAGE_NOT_FOUND));
});

module.exports = router;
