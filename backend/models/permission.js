module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Permission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    permission_name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
  }, { tableName: 'permissions', timestamps: false });
};
