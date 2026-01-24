const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createNotification, getNotifications, deleteNotification } = require('../controllers/notificationController');

router.post('/', authenticate, createNotification);
router.get('/', authenticate, getNotifications);
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;
