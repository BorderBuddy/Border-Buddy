const db = require('./index');
const chalk = require('chalk');
import { User } from './models/user';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const threeHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 3);

const users = [
  { email: 'andrew@borderbuddy.us', password: '1234' },
  { email: 'dillon@borderbuddy.us', password: '1234' },
  { email: 'admin@borderbuddy.us', password: '1234' }
];

const dummyFlights = [{
	flightNum: '88',
	airlineCode: 'UA',
	status: 'scheduled',
	arrivalTime: today
},
{
	flightNum: '88',
	airlineCode: 'UA',
	status: 'scheduled',
	arrivalTime: tomorrow
},
{
	flightNum: '6020',
	airlineCode: 'KL',
	status: 'scheduled',
	arrivalTime: threeHoursAgo
}
];

const dummyTravelers = [
	{ email: '1234@abc.com', phone: '8084982097', name: 'Dirron Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flight_id: 1},
	{ email: '3456@abc.com', phone: '8084982097', name: 'Gandrew Aionfriddy', status: 'transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ email: 'diap@abc.com', phone: '8084982097', name: 'Emily Whasser', status: 'transit', connectivity: true, nationality: 'Iran', flight_id: 1},
	{ email: 'tafman@abc.com', phone: '8084982097', name: 'Taf Thaman', status: 'transit', connectivity: true, nationality: 'Iraq', flight_id: 1},
	{ email: 'ianb@abc.com', phone: '8084982097', name: 'Ian Munrovia', status: 'transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ email: 'peeplesm@abc.com', phone: '8084982097', name: 'Peeples McPerson', status: 'transit', connectivity: true, nationality: 'Afghanistan', flight_id: 1},
	{ email: 'tatiiii@abc.com', phone: '8084982097', name: 'Tatiana Alex', status: 'transit', connectivity: true, nationality: 'Yemen', flight_id: 1},
	{ email: 'clemm@abc.com', phone: '8084982097', name: 'Wat Uwotmate', status: 'transit', connectivity: true, nationality: 'Nigeria', flight_id: 1},
	{ email: 'anthony@abc.com', phone: '8084982097', name: 'DT Jacksern', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flight_id: 1},
	{ email: 'melbrux@abc.com', phone: '8084982097', name: 'Fraulein Hhauserr', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flight_id: 1}
];

const seedFlights = () => db.Promise.each(dummyFlights, flight => db.model('flight').create(flight));
const seedTravelers = () => db.Promise.each(dummyTravelers, traveler => db.model('traveler').create(traveler));
const seedUsers = () => db.Promise.each(users, user => User.findOrCreate({
	where: { email: user.email },
	defaults: { password: user.password }}
));

db.didSync
	.then(seedFlights)
	.then(flights => console.log(chalk.blue(`Seeded ${flights.length} flights...`)))
	.then(seedTravelers)
	.then(travelers => console.log(chalk.blue(`Seeded ${travelers.length} travelers...`)))
	.then(seedUsers)
	.then(users => console.log(chalk.blue(`Seeded ${users.length} users...`)))
	.catch(error => console.error(chalk.red(error.stack)));
