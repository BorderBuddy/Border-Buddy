import {
  show
} from './user.controller';

const base = '/api/user';

export default (app) => {
  app.get(base + '/', show);
};
