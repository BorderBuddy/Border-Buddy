import { Traveler, Flight } from '../database/models'
import axios from 'axios'
import { Twilio } from '../twilio/twilio.controller'
import { config } from '../config'
import { statusByCodeAndDate } from '../flight/flight.query'
import { Promise } from 'bluebird'

const askIfTravelerOk = traveler => {
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
          console.log(result)
          resolve(result)
        }
      })
  })
}

const didFlightLandTwoHoursAgo = flight => {
  const { scheduledArrivalTime, airlineCode, flightNum } = flight
  const date = scheduledArrivalTime.getDate()
  const year = scheduledArrivalTime.getYear() + 1900
  const month = scheduledArrivalTime.getMonth() + 1

  const twoHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 2)

  return axios.get(statusByCodeAndDate(airlineCode, flightNum, year, month, date))
    .then(response => {
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
        // if (!operationalTimes || !operationalTimes.actualGateArrival && !operationalTimes.actualRunwayArrival) {
        //   return false
        // }
          const realArrival = operationalTimes.actualGateArrival
            ? new Date(operationalTimes.actualGateArrival.dateUtc)
            : new Date(operationalTimes.actualRunwayArrival.dateUtc)

          return twoHoursAgo > realArrival
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
        console.log('Flights Found:', flights)
        if (!flights || !flights.length) return new Promise((resolve, reject) => {})
        return Promise.filter(flights, didFlightLandTwoHoursAgo)
      })
      .then(arrivals => {
        console.log('Arrivals Found: ', arrivals)
        if (!arrivals || !arrivals.length) return new Promise((resolve, reject) => {})
        return Promise.all(arrivals.map(arrival => {
          return arrival.landFlight()
        }))
      })
      .then((passengers) => {
        console.log('Passengers Found: ', passengers)
        if (!passengers || !passengers.length) return
        const allTravelers = recursiveFlatten(passengers, [])
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
