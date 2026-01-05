module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    surname: { type: DataTypes.STRING(50), allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: true }
  }, { tableName: 'users', timestamps: false });
};
