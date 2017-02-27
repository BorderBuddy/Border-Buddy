import {
	verifyFlight
} from './flight.controller';

const base = '/api/flight';

export default app => {
	app.post(base + '/', verifyFlight);
}