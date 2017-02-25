import {
	index,
  	create,
  	show,
  	destroy,
  	me,
  	changePassword,
  	authCallback
} from './user.controller';

const base = '/api/user';

export default (app) => {
  app.get(base + '/', index);
  app.get(base + '/me', me);
  app.get(base + '/:id', show);
  app.post(base + '/', create);
  app.put(base + '/:id/password', changePassword);
  app.delete(base + '/:id', destroy);
};
