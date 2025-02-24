const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('', require('../routes/home'));
    app.use('/api/users', require('../routes/user'));
    app.use('/api/auth', require('../routes/auth'));
    app.use('/api/blog', require('../routes/blog'));
    // handle not supported path
    app.use((_, res) => {
        res.status(404).send({ message: "Path not found" });
    });
    app.use(require('../middleware/error'));
}