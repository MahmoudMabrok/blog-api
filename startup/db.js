const mongoose = require('mongoose');
const winston = require('winston');
const config = require('./config');
const func = require('joi/lib/types/func');

module.exports = function() {
  const db = config.getDb();
  mongoose.connect(db)
    .then(() => winston.info(`Connected to MongoDB...${db}`))
    .catch(err => winston.error(`Could not connect to MongoDB...${db}`, err));
}

function disconnect(db){
 mongoose.disconnect()
  .then(() => winston.info(`Disconnected from MongoDB...${db}`))
  .catch(err => winston.error(`Could not disconnect from MongoDB...${db}`, err));
}

module.exports.disconnect = disconnect;