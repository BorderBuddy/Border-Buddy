import * as passportConfig from './passport';
import localAuth from './auth.controller';
// import User models

const base = '/api/auth';
var User = {};
passportConfig.setup(User);

export default (app) => {
  app.post(base + '/local', localAuth);
};
