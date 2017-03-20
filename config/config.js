module.exports = {
  'development' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy',
    username: 'postgres',
    database: 'BorderBuddy',
    dialect: 'postgres'
  },
  'test' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy_test',
    username: 'postgres',
    database: 'BorderBuddy_test',
    dialect: 'postgres'
  },
  'production': {
    use_env_variable: 'DATABASE_URL'
  }
}
