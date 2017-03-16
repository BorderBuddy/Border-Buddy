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
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
