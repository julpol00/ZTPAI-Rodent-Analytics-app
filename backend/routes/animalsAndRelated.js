// Router for animals, weights, and activities endpoints

const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const { Animal } = require('../models');
const { authenticate } = require('../middlewares/authMiddleware');
const { createAnimal } = require('../controllers/animalController');
const { getWeightForDate, addWeight, deleteWeight } = require('../controllers/weightController');
const { getActivitiesForDate, addActivity, deleteActivity } = require('../controllers/activityController');

// animal photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/img/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Animal routes 
router.get('/', authenticate, async (req, res) => {
  try {
    const animals = await Animal.findAll({ where: { id_user: req.user.id } });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/', authenticate, upload.single('photo'), createAnimal);

// Weight routes 
router.get('/:id/weight', authenticate, getWeightForDate);
router.post('/:id/weight', authenticate, addWeight);
router.delete('/:id/weight/:weightId', authenticate, deleteWeight);

// Activity routes
router.get('/:id/activities', authenticate, getActivitiesForDate);
router.post('/:id/activities', authenticate, addActivity);
router.delete('/:id/activities/:activityId', authenticate, deleteActivity);

module.exports = router;
