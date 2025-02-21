const config = require("config");

const getJwt = () =>{
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  return config.get("jwtPrivateKey");
}

const getDb = () => {
  if (!config.get("db")) {
    throw new Error("FATAL ERROR: db is not defined.");
  }

  return config.get("db");

};

const checkConfig = () => {
  getJwt();
  getDb();
}


module.exports.getJwt = getJwt;
module.exports.getDb = getDb;
module.exports.checkConfig = checkConfig;


