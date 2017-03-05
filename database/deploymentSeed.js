const db = require('./index');
const chalk = require('chalk');
import { User } from './models/user';

const users = [
  { email: 'andrew@borderbuddy.us', password: process.env.ADMIN_PW || '1234' },
  { email: 'dillon@borderbuddy.us', password: process.env.ADMIN_PW || '1234' },
  { email: 'admin@borderbuddy.us', password: process.env.ADMIN_PW || '1234' }
]

const seedUsers = () => db.Promise.each(users, user => User.create(user));

db.didSync
  .then(() => ({ force: true }))
  .then(seedUsers)
	.then(users => console.log(chalk.blue(`Seeded ${users.length} users...`)))
  .catch(error => console.error(chalk.red(error)));
