const db = require('./index')
const chalk = require('chalk')
import {Promise} from 'bluebird'

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

const fiveDaysAgo = new Date(new Date() - 1000 * 60 * 60 * 5 * 24)

const users = [
  { email: 'andrew@borderbuddy.us', password: '12345678', phone: '1234567890' },
  { email: 'dillon@borderbuddy.us', password: '12345678', phone: '1234567890' },
  { email: 'aaron@borderbuddy.us', password: '12345678', phone: '1234567890' },
  { email: 'admin@borderbuddy.us', password: '12345678', phone: '1234567890' },
]

/*
* ATTN: Do not change this test data because controller/flight.dev's fixtures depend on it
*/
const dummyFlights = [{
  flightNum: '88',
  airlineCode: 'UA',
  status: 'scheduled',
  scheduledArrivalTime: today,
},
{
  flightNum: '88',
  airlineCode: 'UA',
  status: 'scheduled',
  scheduledArrivalTime: tomorrow,
},
{
  flightNum: '6020',
  airlineCode: 'KL',
  status: 'scheduled',
  scheduledArrivalTime: fiveDaysAgo,
},
]

const dummyTravelers = [
  { email: '1234@abc.com', countryCode: '1', phone: '1234567890', name: 'Dirron Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flightId: 1 },
  { email: '3456@abc.com', countryCode: '93', phone: '1234567890', name: 'Gandrew Aionfriddy', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1 },
  { email: 'diap@abc.com', countryCode: '98', phone: '1234567890', name: 'Emily Whasser', status: 'transit', connectivity: true, nationality: 'Iran', flightId: 1 },
  { email: 'tafman@abc.com', countryCode: '964', phone: '1234567890', name: 'Taf Thaman', status: 'transit', connectivity: true, nationality: 'Iraq', flightId: 1 },
  { email: 'ianb@abc.com', countryCode: '1', phone: '1234567890', name: 'Ian Munrovia', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1 },
  { email: 'peeplesm@abc.com', countryCode: '963', phone: '1234567890', name: 'Peeples McPerson', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1 },
  { email: 'tatiiii@abc.com', countryCode: '93', phone: '1234567890', name: 'Tatiana Alex', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1 },
  { email: 'clemm@abc.com', countryCode: '92', phone: '1234567890', name: 'Wat Uwotmate', status: 'transit', connectivity: true, nationality: 'Nigeria', flightId: 1 },
  { email: 'anthony@abc.com', countryCode: '966', phone: '1234567890', name: 'DT Jacksern', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1 },
  { email: 'melbrux@abc.com', countryCode: '1', phone: '1234567890', name: 'Fraulein Hhauserr', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1 },
]

const seedFlights = () => Promise.each(dummyFlights, flight => db.model('flight').create(flight))
const seedTravelers = () => Promise.each(dummyTravelers, traveler => db.model('traveler').create(traveler))
const seedUsers = () => Promise.each(users, user => db.model('user').create(user))

db.authenticate()
  .then(seedFlights)
  .then(flights => console.log(flights))
  .then(seedTravelers)
  .then(travelers => console.log(travelers))
  .then(seedUsers)
  .then(users => console.log(users))
  .catch(error => console.error(chalk.red(error.stack)))
