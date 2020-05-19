module.exports = {
  'development' : {
    username: 'postgres',
    password: 'password',
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
