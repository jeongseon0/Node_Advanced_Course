class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handlerError = (error, res) => {
  const { statusCode, message } = error;
  res.starus(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  handlerError(error, res);
};

export { ErrorHandler, handlerError, errorMiddleware };
