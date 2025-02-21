
const express = require("express");
const winston = require("winston");
const security = require("./startup/security");
const routes = require("./startup/routes");
const db = require("./startup/db");
const logging = require("./startup/logging");
const config = require("./startup/config");
require('express-async-errors');

const app = express();

db();
routes(app);
security(app);
logging();
config.checkConfig();


const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;