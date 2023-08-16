const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.use(usersRouter);
router.use(moviesRouter);

router.use('*', (res, req, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
