const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.send('Welcome to Blog API');
});

module.exports = router;