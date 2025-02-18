
const express = require("express");
const winston = require("winston");
const security = require("./startup/security");
const routes = require("./startup/routes");
const db = require("./startup/db");
const logging = require("./startup/logging");
const config = require("./startup/config");
const va = require("./startup/config");
const validation = require("./startup/validation");
require('express-async-errors');

const app = express();

validation();
config();
db();
routes(app);
security(app);
logging();

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));