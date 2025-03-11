const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home endpoint
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Home]
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', (_, res) => {
    res.send('Welcome to Blog API');
});

module.exports = router;