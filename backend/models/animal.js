module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    species: { type: DataTypes.STRING(100), allowNull: false },
    birth: { type: DataTypes.DATEONLY, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    avatar: { type: DataTypes.STRING(255), allowNull: true }
  }, { tableName: 'animals', timestamps: false });
};
