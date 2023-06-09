const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ExpressError = require('../utilities/ExpressError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ExpressError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ExpressError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...({ stack: err.stack }),
  };
  if (process.env.NODE_ENV === 'production') {
    delete response.stack;
  }
  console.log(response);
  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};