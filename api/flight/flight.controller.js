// Traveler model
import db from '../../database';
import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';
const Chalk = require('chalk');

import { FLIGHT_STATS_ID, FLIGHT_STATS_KEY } from './apiKeys';

export const verifyFlight = (req, res, next) => {
	// TODO: hit FlightStats api for flight info
}
