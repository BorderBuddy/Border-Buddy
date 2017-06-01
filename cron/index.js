const { CronJob } = require('cron');
const jobs = require('./jobs');
const db = require('../database');

/* SCHEDULED JOBS:

	LAND FLIGHTS AND TEXT TRAVELERS
	1. -get all recent flights (ie landed yesterday or today and has 'scheduled')
	   -check all those flights against API
	   -if landed+2hrs, run 'landFlight' on the instance, which updates to 'landed' and all passengers to 'unconfirmed'
	   -send texts to all those passengers

	SET TO AT RISK
	2. -get all travelers with statuses 'unconfirmed'
		 -set their statuses to 'at risk'
		 -in future, could send email push notifications
*/

// once every fifteen min, at :11 :26 :41 :56
const landFlightsAndTextTravelers = new CronJob({
	cronTime: '0 11,25,41,56 * * * *',
	onTick: jobs.landFlightsAndTextTravelers,
	timeZone: 'America/New_York'
});

// once every fifteen min, at :10 :25 :40 :55
const setUnconfirmedToAtRisk = new CronJob({
	cronTime: '0 10,24,40,55 * * * *',
	onTick: jobs.setToAtRisk,
	timeZone: 'America/New_York'
});


db.didSync
.then(() => {
	landFlightsAndTextTravelers.start();
	setUnconfirmedToAtRisk.start();
});
