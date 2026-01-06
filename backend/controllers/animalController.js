const { Animal } = require('../models');

exports.createAnimal = async (req, res) => {
  const { name, species, birth, notes } = req.body;
  const avatar = req.file ? req.file.filename : null;
  if (!name || !species || !birth || !avatar) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const animal = await Animal.create({
      id_user: req.user.id,
      name,
      species,
      birth,
      description: notes,
      avatar
    });
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error', details: err });
  }
};
