import user from './user/user.route';
import traveler from './traveler/traveler.route';
import auth from './auth/auth.route';
import twilio from './twilio/twilio.route';

const routes = [
  user,
  auth,
  traveler
  twilio,
];

export function addRoutes(app) {
  routes.forEach((r) => r(app));
}
