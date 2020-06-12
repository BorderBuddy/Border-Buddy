const { DB_PASSWORD, DATABASE_URL } = process.env

module.exports = {
  development: {
    username: 'postgres',
    password: DB_PASSWORD,
    database: 'BorderBuddy',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: DB_PASSWORD,
    database: 'BorderBuddy_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: DATABASE_URL
  }
}
