const winston = require('winston');
const path = require('path');

// Create a custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create a logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/combined.log') 
    })
  ]
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Middleware to log requests
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip
  });
  next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    method: req.method,
    url: req.url
  });
  
  // Send error response
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = {
  logger,
  requestLogger,
  errorLogger
};