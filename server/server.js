// IMPORTS:
// Library:
const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { logger } = require("./services/logger");
// Local
// environment variable config
require("./config/config");
// ___________________________

// Server Setup
const app = express();

// ___________________________
// MIDDLEWARE:
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("tiny"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ___________________________

// CONTROLLER CONFIG:

const { mongoose } = require("./db/mongoose");
const usersController = require("./controllers/users-controller");
const router = require("./router");

router(app);

// ___________________________

// PORT:
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

// ___________________________

// EXPORTS:

module.exports = { app };
