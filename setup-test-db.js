const pgtools = require('pgtools')

const config = {
  user: 'postgres',
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  password: 'postgres'
}

pgtools.createdb(config, 'BorderBuddy_test', function (err, res) {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log(res)
})
