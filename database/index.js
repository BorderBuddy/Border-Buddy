const chalk = require('chalk')
const db = require('./db')

// pull in models to database
require('./models')

// Sync the db, creating it if necessary
const testOrSeed = process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'seeding';

const sync = (force = testOrSeed, retries=0, maxRetries=5) => {
  return db.sync({ force }) 
    .then(ok => console.log(chalk.green(`Synced ${db.config.database} database`)))
    .catch(fail => {     
      // Don't do this auto-create nonsense in prod, or
      // if we've retried too many times. 
      if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
        console.error(chalk.red(`********** database error ***********`))
        console.error(chalk.red(`    Couldn't connect to ${db.config.database}`))
        console.error()
        console.error(chalk.red(fail))
        console.error(chalk.red(`*************************************`))
        return
      }
      // Otherwise, do this autocreate nonsense
      console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)

      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${db.config.database}"`, resolve)
      ).then(() => sync(true, retries + 1))
    })
}

db.didSync = sync();

module.exports = db
