import { config } from '../config'
import chalk from 'chalk'
const defaultClient = require('twilio')(config.twilio.accountSid, config.twilio.authToken)

export default class TravelerNotifier {
  constructor ({ client = defaultClient } = {}) {
    this.client = client
  }

  onRegistrationSuccess (traveler) {
    this.client.sendMessage({
      to: traveler.phone,
      from: config.twilio.adminPhone,
      body: `Thanks for registering with BorderBuddy, ${traveler.name}! ` +
      'Safe travels, and text OK to this number after you pass through customs and immigration.'
    }, (err) => {
      if (err) console.error(chalk.red('ERROR SENDING CONFIRMATION TEXT', err.message))
    })
  }
}
