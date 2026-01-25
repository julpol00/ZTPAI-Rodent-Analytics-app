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


/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Get all animals for the authenticated user
 *     tags:
 *       - Animals
 *     responses:
 *       200:
 *         description: List of animals
 *   post:
 *     summary: Create a new animal (with photo upload)
 *     tags:
 *       - Animals
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Animal created
 */

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

/**
 * @swagger
 * /animals/{id}/weight:
 *   get:
 *     summary: Get weights for animal by date
 *     tags:
 *       - Weights
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of weights
 *   post:
 *     summary: Add weight for animal
 *     tags:
 *       - Weights
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Weight added
 * /animals/{id}/weight/{weightId}:
 *   delete:
 *     summary: Delete weight entry
 *     tags:
 *       - Weights
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: weightId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Weight deleted
 */

// Weight routes 
router.get('/:id/weight', authenticate, getWeightForDate);
router.post('/:id/weight', authenticate, addWeight);
router.delete('/:id/weight/:weightId', authenticate, deleteWeight);

/**
 * @swagger
 * /animals/{id}/activities:
 *   get:
 *     summary: Get activities for animal by date
 *     tags:
 *       - Activities
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of activities
 *   post:
 *     summary: Add activity for animal
 *     tags:
 *       - Activities
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Activity added
 * /animals/{id}/activities/{activityId}:
 *   delete:
 *     summary: Delete activity entry
 *     tags:
 *       - Activities
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: activityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Activity deleted
 */

// Activity routes
router.get('/:id/activities', authenticate, getActivitiesForDate);
router.post('/:id/activities', authenticate, addActivity);
router.delete('/:id/activities/:activityId', authenticate, deleteActivity);

module.exports = router;
