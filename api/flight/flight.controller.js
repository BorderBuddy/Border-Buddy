const axios = require('axios');
import db from '../../database';
import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';
import { airlineByCode, flightByCodeAndDate, flightById } from './flight.query'


export const getCode = (req, res, next) => {
	const { code } = req.query;

	axios.get(airlineByCode(code))
	.then(results => {
		const { airlines } = results.data;
		if (!airlines.length) {
			res.status(404).json('Airline not found!')
		} else {
			res.status(200).json(airlines[0])
		}
	})
}


export const verifyFlight = (req, res, next) => {
	const { code, flightNum, year, month, day } = req.query;

	axios.get(flightByCodeAndDate(code, flightNum, year, month, day))
	.then(flight => {
		if (flight.data.error) {
			res.status(404).json('Flight not found!')
		} else {
			res.status(200).json(flight.data)
		}
	})
	.catch(next);
}


/*------------ HELPER FUNCTION FOR CRON JOB ONLY -------------*/

export const getFlightStatus = flightId => {

	return axios.get(flightById(flightId))
	.then(flight => {
		if (flight.data.error) {
			const err = new Error('Error from API provider')
			throw err;
		} else {
			const { estimatedGateArrival } = flight.data.flightStatuses[0];
			return estimatedGateArrival;
		}
	})
	.catch(err => {
		console.error(err)
		return false;
	})
}

