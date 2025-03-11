const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [User]
 *     summary: Get current user information
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/me', (req, res) => {
    res.send('Hello World');
});

module.exports = router;