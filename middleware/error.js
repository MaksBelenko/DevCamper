const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // spread operator
  error.message = err.message;

  // Log to console
  console.log(err.name);
  console.log(err);
  // console.log(err.stack.magenta);

  // Mongoose bad Object
  if (err.name === 'CastError') {
    const message = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate key for the name: ${err.keyValue.name}`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name == 'ValidationError') {
    const message = `Missing required field(s) ${Object.values(err.errors).map(x => x.path)}`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
