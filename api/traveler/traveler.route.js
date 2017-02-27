import {
  createNewTraveler,
  getAllTravelers,
  getById,
  updateOne
} from './traveler.controller';

const base = '/api/traveler';

export default  (app) => {
  app.post(base + '/', createNewTraveler);
  app.get(base + '/', getAllTravelers);
  app.get(base + '/:id', getById);
  app.put(base + '/:id', updateOne)
};
