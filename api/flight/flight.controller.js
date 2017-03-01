const axios = require('axios');
import db from '../../database';
import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';
import { airlineByCode, statusByCodeAndDate, scheduleByCodeAndDate } from './flight.query'


export const getCode = (req, res, next) => {
	const { code } = req.query;

	return axios.get(airlineByCode(code))
	.then(results => {
		const { airlines } = results.data;
		if (!airlines.length) {
			res.status(404).json('code not found')
		} else {
			res.status(200).json(airlines[0])
		}
	})
	.catch(next);
}


export const verifyFlight = (req, res, next) => {
	const { code, flightNum, year, month, day } = req.query;

	return axios.get(scheduleByCodeAndDate(code, flightNum, year, month, day))
	.then(flight => {
		if (flight.data.error || !flight.data.scheduledFlights.length) {
			res.status(404).json('flight not found');
		} else {
			res.status(200).json(flight.data);
		}
	})
	.catch(next);
}


/*------------ HELPER FUNCTION FOR CRON JOB ONLY -------------*/

export const getFlightStatus = (...args) => {

	return axios.get(statusByCodeAndDate(...args))
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
		return err;
	})
}

