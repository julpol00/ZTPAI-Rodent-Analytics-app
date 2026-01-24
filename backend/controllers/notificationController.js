const { Notification, Animal } = require('../models');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{
        model: Animal,
        attributes: ['name', 'id_user'],
        where: { id_user: req.user.id }
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

  exports.deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Notification.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Notification not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message || 'Server error', details: err });
    }
  };
