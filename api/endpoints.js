import user from './user/user.route';
import traveler from './traveler/traveler.route';


const routes = [
  user,
  traveler
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
