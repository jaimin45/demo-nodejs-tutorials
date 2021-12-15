import debug from "debug";
import http from "http";
import app from "../app";

debug.debug("demo-nodejs-tutorials:server");

// Create HTTP server.
const server = http.createServer(app);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const portS = parseInt(val, 10);

  if (Number.isNaN(portS)) {
    // named pipe
    return val;
  }

  if (portS >= 0) {
    // port number
    return portS;
  }

  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
// Listen on provided port, on all network interfaces.
server.listen(port);
app.set("port", port);

// Event listener for HTTP server "error" event.

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const add = server.address();
  const bind = typeof add === "string" ? `pipe ${add}` : `port ${add.port}`;
  debug(`Listening on ${bind}`);
}

server.on("listening", onListening);
server.on("error", onError);
