const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthController');
const authRoutes = require('./auth');

router.get('/health', health);
router.use('/auth', authRoutes);

module.exports = router;
