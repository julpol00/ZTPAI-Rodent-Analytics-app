const express = require('express');
const router = express.Router();

const { Animal } = require('../models');
const { authenticate } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const { createAnimal } = require('../controllers/animalController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/img/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET /animals - get animals for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const animals = await Animal.findAll({ where: { id_user: req.user.id } });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// POST /animals - add animal for logged-in user
router.post('/', authenticate, upload.single('photo'), createAnimal);

module.exports = router;
