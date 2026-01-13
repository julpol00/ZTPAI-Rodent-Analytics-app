const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { createNotification, getNotifications, deleteNotification } = require('../controllers/notificationController');


// POST /notifications - add notification for logged-in user
router.post('/', authenticate, createNotification);

// GET /notifications - get notifications for logged-in user
router.get('/', authenticate, getNotifications);

// DELETE /notifications/:id - usuń powiadomienie
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;
