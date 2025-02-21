const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // winston.exceptions.handle(
  //   new winston.transports.Console({
  //     format: winston.format.combine(
  //       winston.format.colorize(),
  //       winston.format.prettyPrint()
  //     )
  //   }),
  //   new winston.transports.File({ filename: "uncaughtExceptions.log" })
  // );

  process.on("unhandledRejection", (ex) => {
    throw ex; // so `winston` handle it
  });

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
    handleExceptions: true
  }));

  // winston.add(new winston.transports.MongoDB({
  //   db: "mongodb://localhost/blog",
  //   level: "info",
  // }));
};
