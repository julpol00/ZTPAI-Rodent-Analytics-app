const { User, Animal, Role } = require('../models');

// Middleware: tylko admin (role_id === 1)
function onlyAdmin(req, res, next) {
  if (req.user && req.user.role_id === 1) return next();
  return res.status(403).json({ message: 'Forbidden: admin only' });
}

// GET /admin/users - lista użytkowników
async function getUsers(req, res) {
  const users = await User.findAll({ attributes: ['id', 'email', 'name', 'surname', 'role_id', 'blocked'] });
  res.json(users);
}

module.exports = { onlyAdmin, getUsers };

// DELETE /admin/users/:id - usuń użytkownika
async function deleteUser(req, res) {
  const { id } = req.params;
  if (Number(id) === req.user.id) return res.status(400).json({ message: 'Cannot delete yourself' });
  const deleted = await User.destroy({ where: { id } });
  if (deleted) return res.json({ success: true });
  return res.status(404).json({ message: 'User not found' });
}

// PATCH /admin/users/:id/block - blokuj/odblokuj użytkownika
async function blockUser(req, res) {
  const { id } = req.params;
  const { blocked } = req.body;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.blocked = !!blocked;
  await user.save();
  res.json({ success: true });
}

// PATCH /admin/users/:id/role - zmień rolę użytkownika
async function changeUserRole(req, res) {
  const { id } = req.params;
  const { role_id } = req.body;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const role = await Role.findByPk(role_id);
  if (!role) return res.status(400).json({ message: 'Role not found' });
  user.role_id = role_id;
  await user.save();
  res.json({ success: true });
}

// GET /admin/animals - lista wszystkich zwierząt
async function getAnimals(req, res) {
  const animals = await Animal.findAll({
    include: [{
      model: User,
      as: 'User',
      attributes: ['id', 'email', 'name', 'surname']
    }]
  });
  res.json(animals);
}

// DELETE /admin/animals/:id - usuń zwierzę
async function deleteAnimal(req, res) {
  const { id } = req.params;
  const deleted = await Animal.destroy({ where: { id } });
  if (deleted) return res.json({ success: true });
  return res.status(404).json({ message: 'Animal not found' });
}

module.exports = { onlyAdmin, getUsers, deleteUser, blockUser, changeUserRole, getAnimals, deleteAnimal };
