const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'invalid credentials' });

  const payload = { id: user.id, role_id: user.role_id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, surname: user.surname, role_id: user.role_id } });
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id','email','name','surname','role_id'] });
  if (!user) return res.status(404).json({ message: 'not found' });
  res.json({ user });
};
