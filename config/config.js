module.exports = {
  'development' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy',
    username: 'postgres',
    database: 'BorderBuddy',
    dialect: 'postgres'
  },
  'test' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy_test',
    database: 'BorderBuddy_test',
    username: 'postgres',
    dialect: 'postgres'
  },
  'production': {
    use_env_variable: 'DATABASE_URL'
  }
};
