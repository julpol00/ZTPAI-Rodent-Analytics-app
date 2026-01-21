// DELETE /animals/:id/weight/:weightId
exports.deleteWeight = async (req, res) => {
  const animal_id = req.params.id;
  const weightId = req.params.weightId;
  try {
    const weight = await Weight.findOne({ where: { id: weightId, animal_id } });
    if (!weight) return res.status(404).json({ error: 'Weight not found' });
    await weight.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
// POST /animals/:id/weight
exports.addWeight = async (req, res) => {
  const animal_id = req.params.id;
  const { date_weight, weight } = req.body;
  if (!date_weight || !weight) return res.status(400).json({ error: 'Date and weight are required' });
  try {
    const existing = await Weight.findOne({ where: { animal_id, date_weight } });
    if (existing) return res.status(400).json({ error: 'Weight for this day already exists' });
    const newWeight = await Weight.create({ animal_id, date_weight, weight });
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
const { Weight } = require('../models');

// GET /animals/:id/weight?date=YYYY-MM-DD
exports.getWeightForDate = async (req, res) => {
  const animal_id = req.params.id;
  const date = req.query.date;
  if (!date) return res.status(400).json({ error: 'Date is required' });
  try {
    const weight = await Weight.findOne({ where: { animal_id, date_weight: date } });
    if (!weight) return res.json(null);
    res.json(weight);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
