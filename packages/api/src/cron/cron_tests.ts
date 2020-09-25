const jobs = require('./jobs')
const db = require('../database')

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

db.authenticate()
  .then(() => {
    console.log('running cron jobs...')
    // jobs.setToAtRisk()
    jobs.landFlightsAndTextTravelers()
  })
