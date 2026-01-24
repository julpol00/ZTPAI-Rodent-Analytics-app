const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthController');

const authRoutes = require('./auth');
const animalsAndRelatedRoutes = require('./animalsAndRelated');
const notificationRoutes = require('./notification');


router.get('/health', health);
router.use('/auth', authRoutes);
router.use('/animals', animalsAndRelatedRoutes);
router.use('/notifications', notificationRoutes);


const adminRoutes = require('./admin');
router.use('/admin', adminRoutes);

module.exports = router;
