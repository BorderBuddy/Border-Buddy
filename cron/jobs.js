const Traveler = require('../database/models/travelers');
const Flight = require('../database/models/flights');
import axios from 'axios';
import { Twilio } from '../api/twilio/twilio.controller';
import { config } from '../api/config';
import { statusByCodeAndDate } from '../api/flight/flight.query';
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


const didFlightLandTwoHoursAgo = flight => {
	const { arrivalTime, airlineCode, flightNum } = flight;
  const date = arrivalTime.getDate();
  const year = arrivalTime.getYear() + 1900;
  const month = arrivalTime.getMonth() + 1;

  const twoHoursAgo = new Date(new Date() - 1000 * 60 * 60 * 2);

	return axios.get(statusByCodeAndDate(airlineCode, flightNum, year, month, date))
	.then(response => {
		if (response.data.error) {
			throw new Error('Error from FlightStats API');
		} else {
			const { operationalTimes } = response.data.flightStatuses[0];
			if (!operationalTimes || !operationalTimes.actualGateArrival) {
				return false;
			}
			const realArrival = new Date(operationalTimes.actualGateArrival.dateUtc);
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

	setToAtRisk: Traveler.setToAtRisk,

	landFlightsAndTextTravelers: function() {
		Flight.findFlightsToLand()
		.then(flights => {
			if (!flights.length) return;
			return Promise.filter(flights, didFlightLandTwoHoursAgo);
		})
		.then(arrivals => {
			if (!arrivals.length) return;
			return Promise.all(arrivals.map(arrival => {
				return arrival.landFlight();
			}));
		})
		.then((passengers) => {
			if (!passengers) return;
			const allTravelers = recursiveFlatten(passengers, []);
			return Promise.map(allTravelers, askIfTravelerOk);
		})
		.then(messages => {
			console.log(`Sent messages to ${messages.length} travelers`);
		})
		.catch(err => console.error(err));
	}
};
