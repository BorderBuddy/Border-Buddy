// Require our models.
const Traveler = require('./travelers');
const Flight = require('./flights');
const User = require('./user');

// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/

Flight.hasOne(Traveler, {foreignKey: 'flight_id'});
Traveler.belongsTo(Flight); // for eager loading

const Repository = {
  travelers: Traveler,
  flights: Flight,
  users: User
};

module.exports = { Traveler, Flight, User, Repository };
