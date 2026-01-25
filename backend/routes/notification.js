const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createNotification, getNotifications, deleteNotification } = require('../controllers/notificationController');

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animal_id:
 *                 type: integer
 *               notification_time:
 *                 type: string
 *               notification_message:
 *                 type: string
 *               repeat:
 *                 type: string
 *               notification_date:
 *                 type: string
 *               notification_weekday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created
 *   get:
 *     summary: Get all notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: List of notifications
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags:
 *       - Notifications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Notification deleted
 */

router.post('/', authenticate, createNotification);
router.get('/', authenticate, getNotifications);
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;
