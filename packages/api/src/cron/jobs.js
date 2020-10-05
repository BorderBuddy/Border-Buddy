import { Traveler, Flight } from '../database/models'
import axios from 'axios'
import { Twilio } from '../twilio/twilio.controller'
import { config } from '../config'
import { statusByCodeAndDate } from '../flight/flight.query'
import { Promise } from 'bluebird'

const askIfTravelerOk = traveler => {
  // console.log(`traveler number: ${traveler.countryCode}, ${traveler.phone}`)
  return new Promise((resolve, reject) => {
    Twilio.messages
      .create({
        to: `+${traveler.countryCode}${traveler.phone}`,
        from: config.twilio.adminPhone,
        body: `Hi ${traveler.name}, we have not heard from you yet. Please respond with 'ok' if you are through customs and immigration.`,
      }, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
  })
}

const alertAssignedAtRisk = (number, traveler) => {
  return new Promise((resolve, reject) => {
    Twilio.messages
      .create({
        to: number,
        from: config.twilio.adminPhone,
        body: `ALERT! ${traveler.name} has not checked in and has been marked AT RISK.`,
      }, (err, result) => {
        if (err) reject(err)
        else {
          // console.log(result)
          resolve(result)
        }
      })
  })
}

const didFlightLandTwoHoursAgo = flight => {
  const { scheduledArrivalTime, airlineCode, flightNum, id } = flight
  const day = scheduledArrivalTime.getDate()
  const year = scheduledArrivalTime.getFullYear()
  const month = scheduledArrivalTime.getMonth() + 1
  console.log(`cron scheduledArrrival day:${day}, year:${year}, month:${month}`)

  const twoHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 2)
  console.log(`cron twohours ago date: ${twoHoursAgo}`)

  return axios.get(statusByCodeAndDate(airlineCode, flightNum, year, month, day))
    .then(async response => {
      if (response.data.error) {
        if (response.data.error.errorCode === 'DATE_OUT_OF_RANGE') {
          // TODO: we should have validation that keeps users from signing up for flights in the past
          return true
        } else {
          throw new Error(response.data.error.errorMessage)
        }
      } else {
        const { operationalTimes, status } = response.data.flightStatuses[0]
        // TODO: Process Status for edge cases (see chart below)
        if (status === 'L') {
          // TODO: this is currently dateLocal because of only serving JFK,
          // need to change whole application to dateUtc when we roll out more airports
          const realArrival = operationalTimes.actualGateArrival
            ? new Date(operationalTimes.actualGateArrival.dateUtc)
            : new Date(operationalTimes.actualRunwayArrival.dateUtc)

          // console.log(`realArrival time from Flight stats: ${realArrival}`)
          await Flight.update(
            { actualArrivalTime: realArrival },
            { where: {id: id} },
          )
          return (twoHoursAgo > realArrival)
        } else {
          return false
        }
      }
    })
    .catch(err => console.error(err))
}

const recursiveFlatten = (arr, start) => {
  return arr.reduce((prev, curr) => {
    if (!Array.isArray(curr)) {
      return prev.concat(curr)
    } else {
      return recursiveFlatten(curr, prev)
    }
  }, start)
}

module.exports = {

  redactTravelerInfo: () => {
    console.log('redactTravelerInfo cron job started')
    Traveler.redactTravelerInfo()
      .then((travelers) => {
        // do something with this list
        console.log(travelers)
      })
  },

  setToAtRisk: function () {
    console.log('setToAtRisk cron job started...')
    Traveler.setToAtRisk()
      .then((travelers) => {
        return Promise.map(travelers, (traveler) => {
          return Promise.all([
            alertAssignedAtRisk(process.env.NAZ_NUM, traveler),
            alertAssignedAtRisk(process.env.TAREK_NUM, traveler),
          ])
            .catch(err => console.error(err))
        })
      })
  },

  landFlightsAndTextTravelers: function () {
    console.log('landFlightsAndTextTravelers cron job started...')
    Flight.findFlightsToLand()
      .then(flights => {
        console.log(`Flights Found: ${JSON.stringify(flights)}`)
        console.log(`Flights Found: ${flights.length}`)
        if (!flights || !flights.length) return new Promise((resolve, reject) => {})
        return Promise.filter(flights, didFlightLandTwoHoursAgo)
      })
      .then(arrivals => {
        // console.log(`Arrivals Found: ${JSON.stringify(arrivals)}`)
        console.log(`Arrivals Found: ${arrivals.length}`)
        if (!arrivals || !arrivals.length) return new Promise((resolve, reject) => {})
        return Promise.all(arrivals.map(arrival => {
          return arrival.landFlight()
        }))
      })
      .then((passengers) => {
        // console.log(`Passengers Found: ${JSON.stringify(passengers)}`)
        if (!passengers || !passengers.length) return Promise((resolve, reject) => {})
        const allTravelers = recursiveFlatten(passengers, [])
        console.log(`Passengers Found: ${allTravelers.length}`)
        // console.log(`allTravelers after flatten: ${JSON.stringify(allTravelers)}`)
        return Promise.map(allTravelers, askIfTravelerOk)
      })
      .then(messages => {
        if (messages && messages.length) {
          console.log(`Sent messages to ${messages.length} travelers`)
        } else {
          console.log('No messages sent!')
        }
      })
      .catch(err => console.error(err))
  },
}

// From FlightStats API
// The current status of the flight.
// Value	Description
// A	Active
// C	Canceled
// D	Diverted
// DN	Data source needed
// L	Landed
// NO	Not Operational
// R	Redirected
// S	Scheduled
// U	Unknown
