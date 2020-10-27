const jobs = require('./jobs')
const db = require('../database')

db.authenticate()
  .then(() => {
    console.log('running cron jobs...')
    jobs.setToAtRisk()
    jobs.landFlightsAndTextTravelers()
  })
