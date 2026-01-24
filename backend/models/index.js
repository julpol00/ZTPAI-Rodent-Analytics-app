const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./role')(sequelize, DataTypes);
const Permission = require('./permission')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Animal = require('./animal')(sequelize, DataTypes);
const Activity = require('./activity')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const Weight = require('./weight')(sequelize, DataTypes);

// associations
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

User.hasMany(Animal, { foreignKey: 'id_user' });
Animal.belongsTo(User, { as: 'User', foreignKey: 'id_user' });

Animal.hasMany(Activity, { foreignKey: 'animal_id', onDelete: 'CASCADE' });
Activity.belongsTo(Animal, { foreignKey: 'animal_id' });

Animal.hasMany(Weight, { foreignKey: 'animal_id', onDelete: 'CASCADE' });
Weight.belongsTo(Animal, { foreignKey: 'animal_id' });

Animal.hasMany(Notification, { foreignKey: 'animal_id' });
Notification.belongsTo(Animal, { foreignKey: 'animal_id' });

// role-permissions many-to-many
Role.belongsToMany(Permission, { through: 'role_permissions', foreignKey: 'role_id', otherKey: 'permission_id', timestamps: false });
Permission.belongsToMany(Role, { through: 'role_permissions', foreignKey: 'permission_id', otherKey: 'role_id', timestamps: false });

module.exports = {
  sequelize,
  Role,
  Permission,
  User,
  Animal,
  Activity,
  Notification,
  Weight,
};
