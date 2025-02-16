const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('', require('../routes/home'));
    app.use('/api/users', require('../routes/user'));
    app.use('/api/auth', require('../routes/auth'));
    app.use(require('../middleware/error'));
}