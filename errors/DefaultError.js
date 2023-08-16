const { ERROR_CODE } = require('../utils/const');

class DefualtError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.SERVER_ERROR;
  }
}

module.exports = DefualtError;
