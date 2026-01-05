module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animal_id: { type: DataTypes.INTEGER, allowNull: false },
    notification_time: { type: DataTypes.TIME, allowNull: false },
    notification_message: { type: DataTypes.TEXT, allowNull: false },
    repeat: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'NO_REPEAT' }
  }, { tableName: 'notifications', timestamps: false });
};
