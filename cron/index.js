const { CronJob } = require('cron');
const jobs = require('./jobs');
const db = require('../database');


const setToUnconfirmed = new CronJob({
	cronTime: '*/5 * * * * *',
	onTick: jobs.setToUnconfirmed,
	timeZone: 'America/New_York'
});

// runs once every 30 minutes
const setUnconfirmedToAtRisk = new CronJob({
	cronTime: '* */30 * * * *',
	onTick: jobs.setToAtRisk,
	timeZone: 'America/New_York'
});


db.didSync
.then(() => {
	setToUnconfirmed.start();
});

// setUnconfirmedToAtRisk.start();


/* JOB NEEDS TO:


	1. Get all records where date is today or yesterday and status is 'transit'
	2. Set all 'unconfirmed' travelers to 'at risk'


*/