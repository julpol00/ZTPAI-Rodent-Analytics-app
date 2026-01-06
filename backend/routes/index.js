const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthController');


const authRoutes = require('./auth');
const animalRoutes = require('./animal');
const notificationRoutes = require('./notification');



router.get('/health', health);
router.use('/auth', authRoutes);
router.use('/animals', animalRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
