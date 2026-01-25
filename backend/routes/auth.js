const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in, returns token
 * /auth/me:
 *   get:
 *     summary: Get current user info
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 */

router.post('/login', login);
router.get('/me', authenticate, me);

module.exports = router;
