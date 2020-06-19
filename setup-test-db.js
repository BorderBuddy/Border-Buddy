// const pgtools = require('pgtools')

// const config = {
// user: 'postgres',
// port: process.env.POSTGRES_PORT,
// host: process.env.POSTGRES_HOST,
// password: 'postgres'
// }

// pgtools.createdb(config, 'BorderBuddy_test', function (err, res) {
// if (err) {
// console.error(err)
// process.exit(-1)
// }
// console.log('no errors creating db...maybe')
// console.log(res)
// })

const { Client } = require('pg')

const pgclient = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres'
})

pgclient.connect()

const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'
const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com']

pgclient.query(table, (err, res) => {
  if (err) throw err
})

pgclient.query(text, values, (err, res) => {
  if (err) throw err
})

pgclient.query('SELECT * FROM student', (err, res) => {
  if (err) throw err
  console.log(err, res.rows) // Print the data in student table
  pgclient.end()
})
