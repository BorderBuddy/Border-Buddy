import user from './user/user.route';
import scholars from './scholars/scholars.route';
import auth from './auth/auth.route';

const routes = [
  user,
  scholars,
  auth
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
