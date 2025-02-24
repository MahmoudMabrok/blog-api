const helmet = require("helmet");
var cors = require('cors');
const { xss } = require('express-xss-sanitizer');

module.exports = function(app) {
    app.use(helmet());
    app.use(cors());
    app.use(xss());
}