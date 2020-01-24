const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API"
  });
});

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

module.exports = server;
