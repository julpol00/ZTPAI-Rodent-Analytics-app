const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { onlyAdmin, getUsers, deleteUser, blockUser, changeUserRole, getAnimals, deleteAnimal } = require('../controllers/adminController');

// Admin - users
router.get('/users', authenticate, onlyAdmin, getUsers);
router.delete('/users/:id', authenticate, onlyAdmin, deleteUser);
router.patch('/users/:id/block', authenticate, onlyAdmin, blockUser);
router.patch('/users/:id/role', authenticate, onlyAdmin, changeUserRole);

// Admin - animals
router.get('/animals', authenticate, onlyAdmin, getAnimals);
router.delete('/animals/:id', authenticate, onlyAdmin, deleteAnimal);

module.exports = router;
