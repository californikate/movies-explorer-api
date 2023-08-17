const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../utils/errorMessages');
const { DEV_SECRET_KEY } = require('../utils/config');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, DEV_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  req.user = payload;

  next();
};

module.exports = auth;
