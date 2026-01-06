const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env', '.env.example') });

const { sequelize, Role, Permission, User, Animal, Activity, Notification, Weight } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  // roles
  await Role.bulkCreate([
    { id: 1, role_name: 'admin' },
    { id: 2, role_name: 'user' }
  ]);

  // permissions
  await Permission.create({ id: 1, permission_name: 'ADD_RODENT' });

  // role_permissions (through table)
  await sequelize.getQueryInterface().bulkInsert('role_permissions', [ { role_id: 2, permission_id: 1 } ]);

  // users
  await User.create({ id:1, email: 'demo@example.com', password: '$2y$10$abcdefghijklmnopqrstuv.DemoHashHashHashHash', name: 'Demo', surname: 'User', role_id: 2 });
  const bcrypt = require('bcryptjs');
  const pw = bcrypt.hashSync('password', 10);
  await User.create({ id:2, email: 'test@example.com', password: pw, name: 'Test', surname: 'User', role_id: 2 });

  // animals
  await Animal.create({ id:1, id_user:1, name:'DemoRodent', species:'DemoSpecies', birth:'2024-01-01', description:'This is a demo rodent', avatar:'demo.png' });
  await Animal.create({ id:2, id_user:2, name:'Rufus', species:'Hamster', birth:'2023-05-10', description:'Rufus the hamster', avatar:'campbella-chomik.png' });
  await Animal.create({ id:3, id_user:2, name:'Miki', species:'Rat', birth:'2022-11-20', description:'Miki the rat', avatar:'rat.jpg' });

  // activities
  await Activity.create({ id:1, animal_id:1, activity_date:'2025-01-01', start_time:'08:00:00', end_time:'09:00:00', activity_text:'Test activity' });

  // weights
  await Weight.create({ id:1, animal_id:1, date_weight:'2025-01-02', weight:100.00 });

  // notifications
  await Notification.create({ id:1, animal_id:1, notification_time:'12:00:00', notification_message:'Test notification', repeat:'NO_REPEAT' });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
