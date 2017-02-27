// Traveler model
import db from '../../database';
import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';
const axios = require('axios');
const chalk = require('chalk');
import { FLIGHT_STATS_ID, FLIGHT_STATS_KEY } from './apiKeys';

const baseline = 'https://api.flightstats.com/flex'
const query = `?appId=${FLIGHT_STATS_ID}&appKey=${FLIGHT_STATS_KEY}`

// const allAirlinesRoute = baseline + `/airlines/rest/v1/json/active` + query
const byCodeAndDate = (code, flightNum, year, month, day) => 
	baseline + `/schedules/rest/v1/json/flight/${code}/${flightNum}/departing/${year}/${month}/${day}` + query




export const verifyFlight = (req, res, next) => {
	
	const { code, flightNum, year, month, day } = req.query;

	axios.get(byCodeAndDate(code, flightNum, year, month, day))
	.then(flight => {
		console.log('got this flight', flight.data)
		if (flight.data.error) {
			res.status(300).json('Flight not found!')
		} else {
			res.status(200).json(flight.data)
		}
	})
	.catch(chalk.red(console.error));
}
