const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerYaml = require("yamljs");
const { promise } = require("./init/db");
const userTutorial = require("./routes/tutorials");
const logger = require("./config/winston");

const app = express();
const swaggerDoc = swaggerYaml.load("./swagger.yaml");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/tutorial", userTutorial);

// connection message
promise
  .then(() => logger.info("connection successful"))
  .catch(() => logger.error("connection not successful"));

// catch 404 and forward to error handle
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
