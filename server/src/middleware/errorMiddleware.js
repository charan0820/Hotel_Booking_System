/**
 * Catches unmatched routes and turns them into a 404 error passed to
 * the error handler below.
 */
function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

/**
 * Centralized error handler. Controllers/services should call
 * next(err) rather than sending ad-hoc error responses.
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

module.exports = { notFound, errorHandler };
