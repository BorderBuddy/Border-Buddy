const db = require('./db');

const dummyFlights = [{
	number: 'UA88',
	date: 'June 11, 2017',
	time: '11:30pm'
}]

const dummyTravelers = [
	{ phone: '8081980892', name: 'Dirron Pewers', status: 'in transit', connectivity: true, nationality: 'Syria', flight_id: 1},
	{ phone: '8081093892', name: 'Gandrew Aionfriddy', status: 'in transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ phone: '2097470820', name: 'Emily Whasser', status: 'in transit', connectivity: true, nationality: 'Iran', flight_id: 1},
	{ phone: '2340973097', name: 'Taf Thaman', status: 'in transit', connectivity: true, nationality: 'Iraq', flight_id: 1},
	{ phone: '9893389292', name: 'Ian Munrovia', status: 'in transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ phone: '1097497297', name: 'Peeples McPerson', status: 'in transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ phone: '9982784762', name: 'Tatiana Alex', status: 'in transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ phone: '7903338892', name: 'Wat Uwotmate', status: 'in transit', connectivity: true, nationality: 'Nigeria', flight_id: 1},
	{ phone: '2928773366', name: 'DT Jacksern', status: 'in transit', connectivity: true, nationality: 'Sudan', flight_id: 1},
	{ phone: '2027740729', name: 'Fraulein Hhauserr', status: 'in transit', connectivity: true, nationality: 'Sudan', flight_id: 1}
]

const seedFlights = () => db.Promise.each(dummyFlights, flight => db.model('flight').create(flight))
const seedTravelers = () => db.Promise.each(dummyTravelers, traveler => db.model('traveler').create(traveler))

db.didSync
	.then(seedFlights)
	.then(seedUsers)
	.catch(error => console.error(error))