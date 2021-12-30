const { createLogger, transports, format } = require("winston");

const tutorialLogger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { tutorialLogger };
