module.exports = {
  'development' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy',
    dialect: 'postgres'
  },
  'test' : {
    url: 'postgres://postgres:root@localhost:5432/BorderBuddy_test',
    dialect: 'postgres'
  },
  'production': {
    use_env_variable: 'DATABASE_URL'
  }
}
