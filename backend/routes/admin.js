const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { onlyAdmin, getUsers, deleteUser, blockUser, changeUserRole, getAnimals, deleteAnimal } = require('../controllers/adminController');

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of users
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 * /admin/users/{id}/block:
 *   patch:
 *     summary: Block or unblock a user
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User blocked/unblocked
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Change user role
 *     tags:
 *       - Admin
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role changed
 */

// Admin - users
router.get('/users', authenticate, onlyAdmin, getUsers);
router.delete('/users/:id', authenticate, onlyAdmin, deleteUser);
router.patch('/users/:id/block', authenticate, onlyAdmin, blockUser);
router.patch('/users/:id/role', authenticate, onlyAdmin, changeUserRole);

/**
 * @swagger
 * /admin/animals:
 *   get:
 *     summary: Get all animals
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of animals
 *   delete:
 *     summary: Delete an animal
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Animal deleted
 */

// Admin - animals
router.get('/animals', authenticate, onlyAdmin, getAnimals);
router.delete('/animals/:id', authenticate, onlyAdmin, deleteAnimal);

module.exports = router;
