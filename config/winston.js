require("dotenv").config();
const winston = require("winston");
const { format } = require("logform");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
