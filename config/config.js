require('dotenv').config()

const {DB_PASSWORD} = process.env

module.exports = {
  development: {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy',
    username: 'postgres',
    database: 'BorderBuddy',
    dialect: 'postgres',
    password: DB_PASSWORD
  },
  test: {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy_test',
    database: 'BorderBuddy_test',
    username: 'postgres',
    dialect: 'postgres',
    password: DB_PASSWORD

  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
}
