import user from './user/user.route';


const routes = [
  user
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
