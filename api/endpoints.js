import user from './user/user.route';
import auth from './auth/auth.route';

const routes = [
  user,
  auth
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
