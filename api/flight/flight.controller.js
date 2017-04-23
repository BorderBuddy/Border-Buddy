const axios = require('axios');
import { airlineByCode, scheduleByCodeAndDate } from './flight.query';


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
	console.log("QUERRRRRRY******************", req.query)
	const { code, flightNum, year, month, day } = req.query;
	return axios.get(scheduleByCodeAndDate(code, flightNum, year, month, day))
	.then(flight => {
			console.log("FLIIIIIIIIIIIIIGHT*****************", flight.data)
		if (flight.data.error || !flight.data.scheduledFlights.length) {
			console.log("ERROR! ERROR! ERROR! :( :( :( :(")
			res.status(404).json('flight not found');
		} else {
			console.log("YA WE HERE!!!")
			res.status(200).json(flight.data);
		}
	})
	.catch(next);
};

