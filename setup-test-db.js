const { Client } = require('pg')

const pgclient = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: 'postgres',
  password: 'postgres',
  database: 'BorderBuddy_test'
})

pgclient.connect()
pgclient.end()
