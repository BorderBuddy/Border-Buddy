const chalk = require('chalk');
const Sequelize = require('sequelize');
import { config } from '../api/config';

// db server constant(s)
const dbName = 'BorderBuddy' +
  (process.env.NODE_ENV === 'testing' ? '_test' : '');
const url = process.env.DATABASE_URL || `postgres://${config.database.username}:${config.database.password}@localhost:5432/${dbName}`;

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${url}`))

// init the db
const db = new Sequelize(url, {
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  define: {
    freezeTableName: true   // don't go changing our table names, Sequelize
  },
  logging: false
})

module.exports = db;
