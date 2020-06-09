"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require our models.
const travelers_1 = require("./travelers");
const flights_1 = require("./flights");
const user_1 = require("./user");
// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/
flights_1.Flight.hasOne(travelers_1.Traveler, { foreignKey: 'flightId' });
travelers_1.Traveler.belongsTo(flights_1.Flight); // for eager loading
user_1.User.hasOne(travelers_1.Traveler, { foreignKey: 'representative' });
const Repository = {
    travelers: travelers_1.Traveler,
    flights: flights_1.Flight,
    users: user_1.User
};
module.exports = { Traveler: travelers_1.Traveler, Flight: flights_1.Flight, User: user_1.User, Repository };
//# sourceMappingURL=index.js.map