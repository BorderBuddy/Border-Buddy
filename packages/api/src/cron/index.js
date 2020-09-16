const { CronJob } = require('cron')
const jobs = require('./jobs')
const db = require('../database')

// TODO: implement this jobs structure
/* SCHEDULED JOBS:
	LAND FLIGHTS
	1. -get all flights from database that were scheduled to land before now with status 'scheduled'
     -check the flights' statuses with the flightstats API
     -if the flight landed, mark the flight as 'arrived' and update the flight table with 'actualArrivalTime'

  PROCESS FLIGHT AND TEXT PASSENGERS
  2. - get all flights from database with status 'arrived' and actualArrivalTime between 2 and 3 hrs ago
	   - mark all associated travelers to 'unconfirmed'
     - send texts to all those passengers

	SET TO AT RISK
	3. - get all travelers with statuses 'unconfirmed'
		 - set their statuses to 'at risk'
		 - in future, could send email push notifications
*/

// once every fifteen min, at :11 :26 :41 :56
const landFlightsAndTextTravelers = new CronJob({
  cronTime: '0 11,25,41,56 * * * *',
  onTick: jobs.landFlightsAndTextTravelers,
  timeZone: 'America/New_York',
})

// once every fifteen min, at :10 :25 :40 :55
const setUnconfirmedToAtRisk = new CronJob({
  cronTime: '0 10,24,40,55 * * * *',
  onTick: jobs.setToAtRisk,
  timeZone: 'America/New_York',
})

// TODO: uncomment this and the start method below, to turn this on.
// const redactClearedTravelerInfo = new CronJob({
//   cronTime: '0 10,24,40,55 * * * *',
//   onTick: jobs.redactTravelerInfo,
//   timeZone: 'America/New_York',
// })

db.authenticate()
  .then(() => {
    console.log('starting cron jobs...')
    landFlightsAndTextTravelers.start()
    setUnconfirmedToAtRisk.start()
    // redactClearedTravelerInfo.start()
  })
