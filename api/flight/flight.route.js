import {
	verifyFlight,
	getCode
} from './flight.controller';

const base = '/api/flight';

export default app => {
  app.get(base + '/verify', verifyFlight);
  app.get(base + '/code', getCode);
};
