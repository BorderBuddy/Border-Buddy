const db = require('./index');
const chalk = require('chalk');
const Promise = require('bluebird');
import { User } from './models/user';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const threeHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 3);

const users = [
  { email: 'andrew@borderbuddy.us', password: '12345678', phone: '8607163066' },
  { email: 'dillon@borderbuddy.us', password: '12345678', phone: '1234567890' },
  { email: 'admin@borderbuddy.us', password: '12345678', phone: '1234567890' }
];

/*
* ATTN: Do not change this test data because controller/flight.dev's fixtures depend on it
*/
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
	{ email: '1234@abc.com', countryCode: '1',  phone: '8084982097', name: 'Dirron Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flightId: 1},
	{ email: '3456@abc.com', countryCode: '93', phone: '8084982097', name: 'Gandrew Aionfriddy', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1},
	{ email: 'diap@abc.com', countryCode: '98', phone: '8084982097', name: 'Emily Whasser', status: 'transit', connectivity: true, nationality: 'Iran', flightId: 1},
	{ email: 'tafman@abc.com', countryCode: '964', phone: '8084982097', name: 'Taf Thaman', status: 'transit', connectivity: true, nationality: 'Iraq', flightId: 1},
	{ email: 'ianb@abc.com', countryCode: '1', phone: '8084982097', name: 'Ian Munrovia', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1},
	{ email: 'peeplesm@abc.com', countryCode: '963', phone: '8084982097', name: 'Peeples McPerson', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1},
	{ email: 'tatiiii@abc.com', countryCode: '93', phone: '8084982097', name: 'Tatiana Alex', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1},
	{ email: 'clemm@abc.com', countryCode: '92', phone: '8084982097', name: 'Wat Uwotmate', status: 'transit', connectivity: true, nationality: 'Nigeria', flightId: 1},
	{ email: 'anthony@abc.com', countryCode: '966', phone: '8084982097', name: 'DT Jacksern', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1},
	{ email: 'melbrux@abc.com', countryCode: '1', phone: '8084982097', name: 'Fraulein Hhauserr', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1}
];

const seedFlights = () => Promise.each(dummyFlights, flight => db.model('flight').create(flight))
const seedTravelers = () => Promise.each(dummyTravelers, traveler => db.model('traveler').create(traveler));
const seedUsers = () => Promise.each(users, user => User.findOrCreate({
	where: { email: user.email },
	defaults: { password: user.password }}
));

db.authenticate()
	.then(seedFlights)
 	.then(flights => console.log(flights))
	.then(seedTravelers)
	.then(travelers => console.log(travelers))
	.then(seedUsers)
	.then(users => console.log(users))
 	.catch(error => console.error(chalk.red(error.stack)));
