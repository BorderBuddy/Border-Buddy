import * as passportConfig from './passport';
import {login, isAuthenticated, logout} from './auth.controller';
import {User} from '../../database/models/user';

const base = '/api/auth';

passportConfig.setup(User);

export default (app) => {
  app.get(base + '/checkToken', isAuthenticated);
  app.post(base + '/local', login);
  app.post(base + '/logout', logout);
};
