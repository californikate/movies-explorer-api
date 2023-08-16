const { ERROR_CODE } = require('../utils/const');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.CONFLICT;
  }
}

module.exports = ConflictError;
