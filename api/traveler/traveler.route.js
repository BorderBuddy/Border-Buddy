import {
  createNewTraveler
} from './traveler.controller';

const base = '/api/traveler';

export default  (app) => {
  app.post(base + '/add', createNewTraveler);
};
