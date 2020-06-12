// Require our models.
import { Traveler } from './travelers'
import { Flight } from './flights'
import { User } from './user'

// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/

Flight.hasOne(Traveler, { foreignKey: 'flightId' })
Traveler.belongsTo(Flight) // for eager loading
User.hasOne(Traveler, { foreignKey: 'representative' })

const Repository = {
  travelers: Traveler,
  flights: Flight,
  users: User
}

module.exports = { Traveler, Flight, User, Repository }
