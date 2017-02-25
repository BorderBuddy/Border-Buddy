import user from './user/user.route';
import scholars from './scholars/scholars.route';

const routes = [
  user,
  scholars
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
