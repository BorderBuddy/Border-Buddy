import {
	verifyFlight
} from './flight.controller';

const base = '/api/flight';

export default app => {
	app.get(base + '/verify', verifyFlight);
}