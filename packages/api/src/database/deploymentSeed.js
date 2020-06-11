import { User } from './models/user'
const db = require('./index')
const chalk = require('chalk')

const users = [
  { email: 'andrew@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'dillon@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'admin@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' }
]

const seedUsers = () => db.Promise.each(users, user => {
  User.findOrCreate({
    where: { email: user.email },
    defaults: { password: user.password }
  })
})

db.authenticate()
  .then(() => ({ force: true }))
  .then(seedUsers)
  .then(users => console.log(chalk.blue(`Seeded ${users.length} users...`)))
  .catch(error => console.error(chalk.red(error)))
