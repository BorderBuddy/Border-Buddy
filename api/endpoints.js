import user from './user/user.route';
import auth from './auth/auth.route';
import twilio from './twilio/twilio.route';

const routes = [
  user,
  twilio,
  auth
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
