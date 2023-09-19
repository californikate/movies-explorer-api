const { ERROR_CODE } = require('../utils/const');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
