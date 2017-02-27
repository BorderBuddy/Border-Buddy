const chalk = require('chalk')
const db = require('./db')

// pull in models to database
require('./models')

// Sync the db, creating it if necessary
const isTest = process.env.NODE_ENV === 'testing';

const sync = (force = isTest) => {
  return db.sync({ force }) 
    .then(ok => console.log(chalk.green(`Synced ${db.config.database} database`)))
    .catch(fail => {
      console.log(chalk.yellow(`Creating ${db.config.database} database...`))
      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${db.config.database}"`, resolve)
      ).then(() => sync(true))
    })
}

db.didSync = sync();

module.exports = db
