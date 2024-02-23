const { StatusCodes } = require('http-status-codes');

// success response
const successResponse = (res, data, message) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    message,
    data,
  });
};

// error response
const errorResponse = (res, message, statusCode) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message,
  });
};

module.exports = { successResponse, errorResponse };