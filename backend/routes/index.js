const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthController');

const authRoutes = require('./auth');
const animalsAndRelatedRoutes = require('./animalsAndRelated');
const notificationRoutes = require('./notification');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 */

router.get('/health', health);
router.use('/auth', authRoutes);
router.use('/animals', animalsAndRelatedRoutes);
router.use('/notifications', notificationRoutes);


const adminRoutes = require('./admin');
router.use('/admin', adminRoutes);

module.exports = router;
