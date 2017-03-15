const chalk = require('chalk');
const Sequelize = require('sequelize');
import { config } from '../api/config';

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${config.database.url}`));

// init the db
const db = new Sequelize(config.database.url, {
  define: {
    freezeTableName: true   // don't go changing our table names, Sequelize
  },
  logging: true
});


module.exports = db;
