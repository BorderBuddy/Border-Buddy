import {Traveler, Flight, User} from '../database/models'
import axios from 'axios';
import {Twilio} from '../api/twilio/twilio.controller';
import {config} from '../api/config';
import {statusByCodeAndDate} from '../api/flight/flight.query';
const Promise = require('bluebird');


const askIfTravelerOk = traveler => {
  return new Promise((resolve, reject) => {
    Twilio.sendMessage({
      to: `+1${traveler.phone}`, // needs change for non-US numbers
      from: config.twilio.adminPhone,
      body: `Hi ${traveler.name}, we have not heard from you yet. Please respond with 'ok' if you are through customs and immigration.`
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const alertAssignedAtRisk = (number, traveler) => {
  return new Promise((resolve, reject) => {
    Twilio.sendMessage({
      to: number,
      from: config.twilio.adminPhone,
      body: `ALERT! ${traveler.name} has not checked in and has been marked AT RISK.`
    }, (err, result) => {
      if (err) reject(err);
      else {
        console.log(result);
        resolve(result);
      }
    })
  })
};

const didFlightLandTwoHoursAgo = flight => {
  const {arrivalTime, airlineCode, flightNum} = flight;
  const date = arrivalTime.getDate();
  const year = arrivalTime.getYear() + 1900;
  const month = arrivalTime.getMonth() + 1;

  const twoHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 2);

  return axios.get(statusByCodeAndDate(airlineCode, flightNum, year, month, date)) // problem is here
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        const {operationalTimes} = response.data.flightStatuses[0];
        if (!operationalTimes || !operationalTimes.actualGateArrival && !operationalTimes.actualRunwayArrival) {
          return false;
        }
        const realArrival = operationalTimes.actualGateArrival ? 
          new Date(operationalTimes.actualGateArrival.dateUtc) : 
          new Date(operationalTimes.actualRunwayArrival.dateUtc);

        return twoHoursAgo > realArrival;
      }
    })
    .catch(err => console.error(err));
};

const recursiveFlatten = (arr, start) => {
  return arr.reduce((prev, curr) => {
    if (!Array.isArray(curr)) {
      return prev.concat(curr);
    } else {
      return recursiveFlatten(curr, prev);
    }
  }, start);
};


module.exports = {

  setToAtRisk: function () {
    Traveler.setToAtRisk()
    .then((travelers) => {
      return Promise.map(travelers, (traveler) => {
        return Promise.all([
          alertAssignedAtRisk(process.env.NAZ_NUM, traveler),
          alertAssignedAtRisk(process.env.TAREK_NUM, traveler)
        ])
        .catch(err => console.error(err))
      })
    })
  },

  landFlightsAndTextTravelers: function () {
    Flight.findFlightsToLand()
      .then(flights => {
        console.log('Flights Found:', flights);
        if (!flights || !flights.length) return new Promise((resolve, reject) => {});
        return Promise.filter(flights, didFlightLandTwoHoursAgo);
      })
      .then(arrivals => {
        console.log('Arrivals Found: ', arrivals);
        if (!arrivals || !arrivals.length) return new Promise((resolve, reject) => {});
        return Promise.all(arrivals.map(arrival => {
          return arrival.landFlight();
        }));
      })
      .then((passengers) => {
        console.log('Passengers Found: ', passengers);
        if (!passengers || !passengers.length) return;
        const allTravelers = recursiveFlatten(passengers, []);
        return Promise.map(allTravelers, askIfTravelerOk);
      })
      .then(messages => {
        if (messages && messages.length) {
          console.log(`Sent messages to ${messages.length} travelers`);
        } else {
          console.log('No messages sent!');
        }
      })
      .catch(err => console.error(err));
  },
};
