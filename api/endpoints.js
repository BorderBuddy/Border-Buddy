import user from './user/user.route';
import traveler from './traveler/traveler.route';
import auth from './auth/auth.route';

const routes = [
  user,
  auth,
  traveler
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
