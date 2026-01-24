
exports.deleteActivity = async (req, res) => {
  const animal_id = req.params.id;
  const activityId = req.params.activityId;
  try {
    const activity = await Activity.findOne({ where: { id: activityId, animal_id } });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    await activity.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
const { Activity } = require('../models');

exports.getActivitiesForDate = async (req, res) => {
  const animal_id = req.params.id;
  const date = req.query.date;
  if (!date) return res.status(400).json({ error: 'Date is required' });
  try {
    const activities = await Activity.findAll({
      where: { animal_id, activity_date: date },
      order: [['start_time', 'ASC']]
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

exports.addActivity = async (req, res) => {
  const animal_id = req.params.id;
  const { activity_date, start_time, end_time, activity_text } = req.body;
  if (!activity_date || !start_time || !end_time || !activity_text) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const activity = await Activity.create({
      animal_id,
      activity_date,
      start_time,
      end_time,
      activity_text
    });
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
