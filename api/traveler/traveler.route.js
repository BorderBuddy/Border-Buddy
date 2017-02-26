import {
  createNewTraveler,
  getAllTraveler
} from './traveler.controller';

const base = '/api/traveler';

export default  (app) => {
  app.post(base + '/add', createNewTraveler);
  app.get(base + '/getAll', getAllTraveler);
};
