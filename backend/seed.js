const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env', '.env.example') });

const { sequelize, Role, User, Animal, Activity, Notification, Weight } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  // roles
  await Role.bulkCreate([
    { id: 1, role_name: 'admin' },
    { id: 2, role_name: 'user' }
  ]);


  // (permissions and role_permissions removed)


  // users
  const bcrypt = require('bcryptjs');
  const pw = bcrypt.hashSync('password', 10);
  await User.create({ id: 1, email: 'admin@example.com', password: pw, name: 'Admin', surname: 'Admin user', role_id: 1, blocked: false });
  await User.create({ id: 2, email: 'adam@example.com', password: pw, name: 'Adam', surname: 'Kowalski', role_id: 2, blocked: false });
  await User.create({ id: 3, email: 'julia@example.com', password: pw, name: 'Julia', surname: 'Polak', role_id: 2, blocked: false});
  await User.create({ id: 4, email: 'robert@example.com', password: pw, name: 'Robert', surname: 'Nowak', role_id: 2, blocked: false});

  // animals
  await Animal.create({ id:1, id_user:3, name:'Rufus', species:'Hamster', birth:'2023-05-10', description:'Rufus the hamster', avatar:'campbella-chomik.png' });
  await Animal.create({ id:2, id_user:3, name:'Miki', species:'Rat', birth:'2022-11-20', description:'Miki the rat', avatar:'rat.jpg' });
  await Animal.create({ id:3, id_user:2, name:'Ander', species:'Chinchilla', birth:'2017-12-01', description:'Very nice chinchilla!!!', avatar:'szynszyl.jpg' });
  await Animal.create({ id:4, id_user:4, name:'Poziomka', species:'Ground squirrel', birth:'2020-05-01', description:'Poziomka is ground squirrel with a playful nature. Unfortunately she is a little sick and need medicine.', avatar:'suseł.jpg' });


  // activities
  await Activity.create({ id:1, animal_id:2, activity_date:'2026-01-01', start_time:'08:00:00', end_time:'09:00:00', activity_text:'Morning walk' });
  await Activity.create({ id:2, animal_id:2, activity_date:'2026-01-02', start_time:'10:30:00', end_time:'11:15:00', activity_text:'Vet visit' });
  await Activity.create({ id:3, animal_id:2, activity_date:'2026-01-03', start_time:'14:00:00', end_time:'15:00:00', activity_text:'Playtime' });
  await Activity.create({ id:4, animal_id:2, activity_date:'2026-01-04', start_time:'16:45:00', end_time:'17:30:00', activity_text:'Feeding' });
  await Activity.create({ id:5, animal_id:2, activity_date:'2026-01-05', start_time:'19:00:00', end_time:'20:00:00', activity_text:'Cleaning cage' });
  await Activity.create({ id:6, animal_id:2, activity_date:'2026-01-06', start_time:'21:15:00', end_time:'22:00:00', activity_text:'Evening rest' });
  await Activity.create({ id:7, animal_id:4, activity_date:'2026-01-02', start_time:'09:00:00', end_time:'09:30:00', activity_text:'Morning medicine' });
  await Activity.create({ id:8, animal_id:4, activity_date:'2026-01-03', start_time:'12:00:00', end_time:'12:45:00', activity_text:'Sunbathing' });
  await Activity.create({ id:9, animal_id:4, activity_date:'2026-01-04', start_time:'15:00:00', end_time:'15:30:00', activity_text:'Play with wheel' });
  await Activity.create({ id:10, animal_id:4, activity_date:'2026-01-05', start_time:'18:00:00', end_time:'18:20:00', activity_text:'Feeding and water' });
  await Activity.create({ id:11, animal_id:4, activity_date:'2026-01-06', start_time:'20:00:00', end_time:'20:30:00', activity_text:'Evening rest' });
  await Activity.create({ id:12, animal_id:4, activity_date:'2026-01-04', start_time:'08:00:00', end_time:'08:20:00', activity_text:'Morning snack' });
  await Activity.create({ id:13, animal_id:4, activity_date:'2026-01-04', start_time:'10:00:00', end_time:'10:30:00', activity_text:'Short walk' });
  await Activity.create({ id:14, animal_id:4, activity_date:'2026-01-04', start_time:'17:00:00', end_time:'17:15:00', activity_text:'Medicine' });
  await Activity.create({ id:15, animal_id:1, activity_date:'2026-01-02', start_time:'08:00:00', end_time:'08:30:00', activity_text:'Morning run' });
  await Activity.create({ id:16, animal_id:1, activity_date:'2026-01-02', start_time:'12:00:00', end_time:'12:20:00', activity_text:'Snack time' });
  await Activity.create({ id:17, animal_id:1, activity_date:'2026-01-03', start_time:'15:00:00', end_time:'15:45:00', activity_text:'Wheel play' });
  await Activity.create({ id:18, animal_id:1, activity_date:'2026-01-03', start_time:'18:00:00', end_time:'18:30:00', activity_text:'Cage cleaning' });
  await Activity.create({ id:19, animal_id:3, activity_date:'2026-01-04', start_time:'09:00:00', end_time:'09:40:00', activity_text:'Morning grooming' });
  await Activity.create({ id:20, animal_id:3, activity_date:'2026-01-04', start_time:'14:00:00', end_time:'14:30:00', activity_text:'Sunbathing' });
  await Activity.create({ id:21, animal_id:3, activity_date:'2026-01-05', start_time:'11:00:00', end_time:'11:20:00', activity_text:'Snack time' });
  await Activity.create({ id:22, animal_id:3, activity_date:'2026-01-05', start_time:'17:00:00', end_time:'17:30:00', activity_text:'Play with toys' });


  // weights
await Weight.create({ id:1, animal_id:2, date_weight:'2026-01-01', weight:100.00 });
await Weight.create({ id:2, animal_id:2, date_weight:'2026-01-02', weight:102.00 });
await Weight.create({ id:3, animal_id:2, date_weight:'2026-01-03', weight:101.50 });
await Weight.create({ id:4, animal_id:2, date_weight:'2026-01-04', weight:103.20 });
await Weight.create({ id:5, animal_id:2, date_weight:'2026-01-05', weight:104.00 });
await Weight.create({ id:6, animal_id:2, date_weight:'2026-01-06', weight:102.80 });
await Weight.create({ id:7, animal_id:1, date_weight:'2026-01-01', weight:198.50 });
await Weight.create({ id:8, animal_id:1, date_weight:'2026-01-02', weight:200.10 });
await Weight.create({ id:9, animal_id:1, date_weight:'2026-01-03', weight:201.30 });
await Weight.create({ id:10, animal_id:1, date_weight:'2026-01-04', weight:199.80 });
await Weight.create({ id:11, animal_id:1, date_weight:'2026-01-05', weight:202.00 });
await Weight.create({ id:12, animal_id:1, date_weight:'2026-01-06', weight:200.75 });
await Weight.create({ id:13, animal_id:4, date_weight:'2026-01-01', weight:320.00 });
await Weight.create({ id:14, animal_id:4, date_weight:'2026-01-02', weight:319.50 });
await Weight.create({ id:15, animal_id:4, date_weight:'2026-01-03', weight:321.20 });
await Weight.create({ id:16, animal_id:4, date_weight:'2026-01-04', weight:318.80 });
await Weight.create({ id:17, animal_id:4, date_weight:'2026-01-05', weight:322.10 });
await Weight.create({ id:18, animal_id:4, date_weight:'2026-01-06', weight:320.75 });
await Weight.create({ id:19, animal_id:3, date_weight:'2026-01-01', weight:498.00 });
await Weight.create({ id:20, animal_id:3, date_weight:'2026-01-02', weight:501.20 });
await Weight.create({ id:21, animal_id:3, date_weight:'2026-01-03', weight:499.50 });
await Weight.create({ id:22, animal_id:3, date_weight:'2026-01-04', weight:502.10 });
await Weight.create({ id:23, animal_id:3, date_weight:'2026-01-05', weight:500.30 });
await Weight.create({ id:24, animal_id:3, date_weight:'2026-01-06', weight:497.90 });

  // notifications
  await Notification.create({
    id: 1,
    animal_id: 1,
    notification_time: '12:00:00',
    notification_message: 'Playtime reminder',
    repeat: 'no_repeat',
    notification_date: '2026-01-07',
    notification_weekday: null
  });
  await Notification.create({
    id: 2,
    animal_id: 1,
    notification_time: '08:30:00',
    notification_message: 'Medicine!',
    repeat: 'repeat_daily',
    notification_date: '2026-01-08',
    notification_weekday: null
  });
  await Notification.create({
    id: 3,
    animal_id: 2,
    notification_time: '15:45:00',
    notification_message: 'Case cleaning day',
    repeat: 'repeat_weekly',
    notification_date: null,
    notification_weekday: 'Friday'
  });
  await Notification.create({
    id: 4,
    animal_id: 2,
    notification_time: '09:00:00',
    notification_message: 'Vet appointment',
    repeat: 'no_repeat',
    notification_date: '2026-01-10',
    notification_weekday: null
  });
  await Notification.create({
    id: 5,
    animal_id: 2,
    notification_time: '18:30:00',
    notification_message: 'Daily feeding reminder',
    repeat: 'repeat_daily',
    notification_date: null,
    notification_weekday: null
  });
  await Notification.create({
    id: 6,
    animal_id: 3,
    notification_time: '20:00:00',
    notification_message: 'Weekly cage cleaning',
    repeat: 'repeat_weekly',
    notification_date: null,
    notification_weekday: 'Monday'
  });
  await Notification.create({
    id: 7,
    animal_id: 3,
    notification_time: '07:15:00',
    notification_message: 'Morning playtime',
    repeat: 'no_repeat',
    notification_date: '2026-01-12',
    notification_weekday: null
  });

await Notification.create({
  id: 8,
  animal_id: 3,
  notification_time: '13:00:00',
  notification_message: 'Lunch snack',
  repeat: 'no_repeat',
  notification_date: '2026-01-13',
  notification_weekday: null
});
await Notification.create({
  id: 9,
  animal_id: 3,
  notification_time: '19:30:00',
  notification_message: 'Evening walk',
  repeat: 'repeat_daily',
  notification_date: null,
  notification_weekday: null
});

await Notification.create({
  id: 10,
  animal_id: 4,
  notification_time: '10:00:00',
  notification_message: 'Medicine time',
  repeat: 'repeat_daily',
  notification_date: null,
  notification_weekday: null
});
await Notification.create({
  id: 11,
  animal_id: 4,
  notification_time: '16:00:00',
  notification_message: 'Afternoon play',
  repeat: 'no_repeat',
  notification_date: '2026-01-14',
  notification_weekday: null
});

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
