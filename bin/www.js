const http = require("http");
const debug = require("debug")("nodeJsDemo:server");
const app = require("../app");

const server = http.createServer(app);

function normalizePort(val) {
  const port = parseInt(val, 10);

  // if (isNaN(port)) {
  //   return val;
  // }

  if (port >= 0) {
    return port;
  }

  return false;
}
const port = normalizePort(process.env.PORT);
app.set("port", port);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const add = server.address();
  const bind = typeof add === "string" ? `pipe ${add}` : `port ${add.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
