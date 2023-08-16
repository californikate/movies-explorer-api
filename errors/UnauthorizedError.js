const { ERROR_CODE } = require('../utils/const');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
