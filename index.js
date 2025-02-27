
const express = require("express");
const winston = require("winston");
const security = require("./startup/security");
const routes = require("./startup/routes");
const db = require("./startup/db");
const logging = require("./startup/logging");
const { checkConfig } = require("./startup/config");
const validation = require("./startup/validation");
require('express-async-errors');

const app = express();

validation();
db();
routes(app);
security(app);
logging();
checkConfig();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;