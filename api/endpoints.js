import user from './user/user.route'
import traveler from './traveler/traveler.route'
import auth from './auth/auth.route'
import twilio from './twilio/twilio.route'
import flight from './flight/flight.route'

const routes = [
  user,
  auth,
  traveler,
  twilio,
  flight
]

export function addRoutes (app) {
  routes.forEach((route) => route(app))
}
