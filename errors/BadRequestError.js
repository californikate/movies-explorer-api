const { ERROR_CODE } = require('../utils/const');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
