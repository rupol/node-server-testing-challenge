const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const chickensModel = require("./chickens/chickens-model");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res, next) => {
  res.json({
    message: "Enjoy my chickens API"
  });
});

server.get("/chickens", async (req, res, next) => {
  try {
    const chickens = await chickensModel.get();
    res.status(200).json(chickens);
  } catch (err) {
    next(err);
  }
});

server.get("/chickens/:id", async (req, res, next) => {
  try {
    const chicken = await chickensModel.getById(req.params.id);
    res.status(200).json(chicken);
  } catch (err) {
    next(err);
  }
});

server.post("/chickens", async (req, res, next) => {
  try {
    const chicken = await chickensModel.create(req.body);
    res.status(201).json(chicken);
  } catch (err) {
    next(err);
  }
});

server.put("/chickens/:id", async (req, res, next) => {
  try {
    const chicken = await chickensModel.update(req.params.id, req.body);
    res.status(200).json(chicken);
  } catch (err) {
    next(err);
  }
});

server.delete("/chickens/:id", async (req, res, next) => {
  try {
    await chickensModel.del(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
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
