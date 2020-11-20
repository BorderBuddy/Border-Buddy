// This is a hack that gets around 'cannot redeclare block scoped variable' error
export {}
const jobs = require('./jobs')
const db = require('../database')

db.authenticate().then(() => {
  console.log('running worker...')
  jobs.setToAtRisk()
  jobs.landFlightsAndTextTravelers()
})
