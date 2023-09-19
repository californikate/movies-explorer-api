const { ERROR_CODE } = require('../utils/const');

const errors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE.SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
};

module.exports = errors;
