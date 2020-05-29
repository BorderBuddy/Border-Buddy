import {
  createNewTraveler,
  getAllTravelers,
  getById,
  updateOne,
  deleteOne
} from './traveler.controller';

const base = '/api/traveler';

import { protectedEndpoint } from '../auth/auth.service';

export default app => {
  app.post(base + '/', createNewTraveler);
  app.get(base + '/', protectedEndpoint(getAllTravelers));
  app.get(base + '/:id', protectedEndpoint(getById));
  app.put(base + '/:id', protectedEndpoint(updateOne));
  app.delete(base + '/:id', protectedEndpoint(deleteOne));
};
