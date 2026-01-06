const express = require('express');
const router = express.Router();
const { Animal } = require('../models');
const { authenticate } = require('../middlewares/authMiddleware');

// GET /animals - get animals for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const animals = await Animal.findAll({ where: { id_user: req.user.id } });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
