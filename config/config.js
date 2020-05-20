require('dotenv').config()

const { DB_PASSWORD } = process.env

module.exports = {
  development: {
    username: 'postgres',
    password: DB_PASSWORD,
    database: 'BorderBuddy',
    dialect: 'postgres'
  },
  test: {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy_test',
    database: 'BorderBuddy_test',
    username: 'postgres',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
}
