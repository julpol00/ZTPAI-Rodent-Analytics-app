const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthController');




const authRoutes = require('./auth');
const animalRoutes = require('./animal');
const notificationRoutes = require('./notification');
const { onlyAdmin, getUsers, deleteUser, blockUser, changeUserRole, getAnimals, deleteAnimal } = require('../controllers/adminController');

router.get('/health', health);
router.use('/auth', authRoutes);
router.use('/animals', animalRoutes);
router.use('/notifications', notificationRoutes);

// Admin endpoint - tylko dla admina
const { authenticate } = require('../middlewares/authMiddleware');

// Admin - users
router.get('/admin/users', authenticate, onlyAdmin, getUsers);
router.delete('/admin/users/:id', authenticate, onlyAdmin, deleteUser);
router.patch('/admin/users/:id/block', authenticate, onlyAdmin, blockUser);
router.patch('/admin/users/:id/role', authenticate, onlyAdmin, changeUserRole);

// Admin - animals
router.get('/admin/animals', authenticate, onlyAdmin, getAnimals);
router.delete('/admin/animals/:id', authenticate, onlyAdmin, deleteAnimal);

module.exports = router;
