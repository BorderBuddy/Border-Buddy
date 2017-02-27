const db = require('./index');
const chalk = require('chalk')

const dummyFlights = [{
	flightNum: 'UA88',
	status: 'scheduled',
	arrivalDate: Date.now()
}]

const dummyTravelers = [
	{ email: '1234@abc.com', phone: '8081980892', firstName: 'Dirron', lastName: 'Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flight_id: 1},
	{ email: '3456@abc.com', phone: '8081093892', firstName: 'Gandrew', lastName: 'Aionfriddy', status: 'transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ email: 'diap@abc.com', phone: '2097470820', firstName: 'Emily', lastName: 'Whasser', status: 'transit', connectivity: true, nationality: 'Iran', flight_id: 1},
	{ email: 'tafman@abc.com', phone: '2340973097', firstName: 'Taf', lastName: 'Thaman', status: 'transit', connectivity: true, nationality: 'Iraq', flight_id: 1},
	{ email: 'ianb@abc.com', phone: '9893389292', firstName: 'Ian', lastName: 'Munrovia', status: 'transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ email: 'peeplesm@abc.com', phone: '1097497297', firstName: 'Peeples', lastName: 'McPerson', status: 'transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ email: 'tatiiii@abc.com', phone: '9982784762', firstName: 'Tatiana', lastName: 'Alex', status: 'transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ email: 'clemm@abc.com', phone: '7903338892', firstName: 'Wat', lastName: 'Uwotmate', status: 'transit', connectivity: true, nationality: 'Nigeria', flight_id: 1},
	{ email: 'anthony@abc.com', phone: '2928773366', firstName: 'DT', lastName: 'Jacksern', status: 'transit', connectivity: true, nationality: 'Sudan', flight_id: 1},
	{ email: 'melbrux@abc.com', phone: '2027740729', firstName: 'Fraulein', lastName: 'Hhauserr', status: 'transit', connectivity: true, nationality: 'Sudan', flight_id: 1}
]

const seedFlights = () => db.Promise.each(dummyFlights, flight => db.model('flight').create(flight))
const seedTravelers = () => db.Promise.each(dummyTravelers, traveler => db.model('traveler').create(traveler))

db.didSync
	.then(seedFlights)
	.then(flights => console.log(chalk.blue(`Seeded ${flights.length} flights...`)))
	.then(seedTravelers)
	.then(travelers => console.log(chalk.blue(`Seeded ${travelers.length} travelers...`)))
	.catch(error => console.error(chalk.red(error)))