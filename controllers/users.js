const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../utils/errorMessages');
const { DEV_SECRET_KEY } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(errorMessages.NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError(errorMessages.NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      return next(err);
    });
};

const postUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.CONFLICT));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY,
        { expiresIn: '7d' },
      );

      res.status(200).send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  postUser,
  login,
};
