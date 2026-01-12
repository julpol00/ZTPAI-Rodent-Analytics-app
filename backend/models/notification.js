module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animal_id: { type: DataTypes.INTEGER, allowNull: false },
    notification_time: { type: DataTypes.TIME, allowNull: false },
    notification_message: { type: DataTypes.TEXT, allowNull: false },
    repeat: {
      type: DataTypes.ENUM('no_repeat', 'repeat_daily', 'repeat_weekly'),
      allowNull: false,
      defaultValue: 'no_repeat'
    },
    notification_date: { type: DataTypes.DATEONLY, allowNull: true },
    notification_weekday: { type: DataTypes.STRING(20), allowNull: true }
  }, { tableName: 'notifications', timestamps: false });
};
