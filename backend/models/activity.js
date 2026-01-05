module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Activity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animal_id: { type: DataTypes.INTEGER, allowNull: false },
    activity_date: { type: DataTypes.DATEONLY, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    activity_text: { type: DataTypes.TEXT, allowNull: false }
  }, { tableName: 'activities', timestamps: false });
};
