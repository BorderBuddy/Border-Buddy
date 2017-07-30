import axios from 'axios';
import { airlineByCode, scheduleByCodeAndDate } from './flight.query';
import { flightInfoMapper, airlineInfoMapper } from '../utils/mappers';


export const getCode = (req, res, next) => {
	const { code } = req.query;

	return axios.get(airlineByCode(code))
	.then(results => {
		const { airlines } = results.data;
		if (!airlines.length) {
			res.status(404).json('code not found');
		} else {
			const mappedAirlineInfo = airlineInfoMapper(airlines);
			res.status(200).json(mappedAirlineInfo);
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
			const mappedFlightInfo = flightInfoMapper(flight.data);
			res.status(200).json(mappedFlightInfo);
		}
	})
	.catch(next);
};

