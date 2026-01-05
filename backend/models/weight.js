module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Weight', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animal_id: { type: DataTypes.INTEGER, allowNull: false },
    date_weight: { type: DataTypes.DATEONLY, allowNull: false },
    weight: { type: DataTypes.DECIMAL(6,2), allowNull: false }
  }, { tableName: 'weights', timestamps: false });
};
