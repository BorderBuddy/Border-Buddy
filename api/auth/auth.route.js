import * as passportConfig from './passport';
import localAuth from './auth.controller';
import { isAuthenticated } from './auth.service';
import { User } from '../../database/models/user'

const base = '/api/auth';

passportConfig.setup(User);

export default (app) => {
  app.post(base + '/checkToken', isAuthenticated());
  app.post(base + '/local', localAuth);
};
