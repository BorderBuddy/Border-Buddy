const axios = require('axios');
import { airlineByCode, scheduleByCodeAndDate, statusByCodeAndDate } from './flight.query';


export const getCode = (req, res, next) => {
	const { code } = req.query;

	return axios.get(airlineByCode(code))
	.then(results => {
		const { airlines } = results.data;
		if (!airlines.length) {
			res.status(404).json('code not found');
		} else {
			res.status(200).json(airlines[0]);
		}
	})
	.catch(next);
};


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
};




	// if the landing date of the flight is in the past, use statusByCodeAndDate
	// else use scheduleByCodeAndDate