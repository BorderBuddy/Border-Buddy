import {
  getAll,
  getOne,
  create,
  update,
  remove
} from './scholars.controller';

const base = '/api/scholars';

export default (app) => {
  app.get(base + '/', getAll);
  app.get(base + '/:id', getOne);
  app.post(base + '/', create);
  app.put(base + '/:id', update);
  app.delete(base + '/:id', remove);
};
