// var http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log('Server is running on port 3000');
//     res.end('Hello World');
// })
// server.listen(process.env.PORT || 3000);
// The above code is the same as the code in server.js. The only difference is that the server is created using the http module and the createServer method. The server is listening on port 3000. The server is created using the createServer method and the request and response objects are passed as arguments to the callback function. The request and response objects are used to handle the incoming request and send the response back to the client. The response object has a method called end which is used to send the response back to the client. The server is listening on port 3000. The server is created using the createServer method and the request and response objects are passed as arguments to the callback function. The request and response objects are used to handle the incoming request and send the response back to the client. The response object has a method called end which is used to send the response back to the client.

// var http = require('http');
// const app = require('./backend/app');
// app.set('port', process.env.PORT || 3000);
// const server = http.createServer(app);
// server.listen(process.env.PORT || 300);
// The above code is the same as the code in server.js. The only difference is that the server is created using the http module and the createServer method. The server is listening on port 3000. The server is created using the createServer method and the request and response objects are passed as arguments to the callback function. The request and response objects are used to handle the incoming request and send the response back to the client. The response object has a method called end which is used to send the response back to the client. The server is listening on port 3000. The server is created using the createServer method and the request and response objects are passed as arguments to the callback function. The request and response objects are used to handle the incoming request and send the response back to the client. The response object has a method called end which is used to send the response back to the client.

const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
