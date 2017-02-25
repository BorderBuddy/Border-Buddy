import * as passportConfig from './passport';
import localAuth from './auth.controller';
import { User } from '../../database/models/user'

const base = '/api/auth';

passportConfig.setup(User);

export default (app) => {
  app.post(base + '/local', localAuth);
};
