const { Notification, Animal } = require('../models');

exports.getNotifications = async (req, res) => {
  try {
    // Możesz filtrować po użytkowniku jeśli jest taka potrzeba
    const notifications = await Notification.findAll({
      include: [{
        model: Animal,
        attributes: ['name']
      }]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error', details: err });
  }
};

exports.createNotification = async (req, res) => {
  const { animal_id, notification_time, notification_message, repeat, notification_date, notification_weekday } = req.body;
  if (!animal_id || !notification_time || !notification_message) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }
  try {
    const notification = await Notification.create({
      animal_id,
      notification_time,
      notification_message,
      repeat: repeat || 'NO_REPEAT',
      notification_date: notification_date || null,
      notification_weekday: notification_weekday || null
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error', details: err });
  }
};
