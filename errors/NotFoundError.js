const { ERROR_CODE } = require('../utils/const');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.NOT_FOUND;
  }
}

module.exports = NotFoundError;
