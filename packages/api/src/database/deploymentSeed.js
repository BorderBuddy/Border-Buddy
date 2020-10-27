import { User } from './models/user'
const db = require('./index')
const chalk = require('chalk')
import {Promise} from 'bluebird'

const users = [
  { email: 'andrew@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'dillon@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'admin@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'aaron@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
  { email: 'thea@borderbuddy.us', password: process.env.ADMIN_PW || '12345678' },
]

const seedUsers = () => Promise.each(users, user => {
  User
    .findOrCreate({
      where: {email: user.email},
      defaults: { password: user.password },
    })
    .spread(function (user, created) {
      console.log(user.get({
        plain: true,
      }))
      console.log(`created: ${created}`)
    })
})

db.authenticate()
  // .then(() => ({ force: true }))
  .then(seedUsers)
  .then(users => console.log(chalk.blue(`Seeded ${users.length} users...`)))
  .catch(error => console.error(chalk.red(error)))
