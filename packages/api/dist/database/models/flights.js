"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const Sequelize = require('sequelize');
const db = require('../db');
const travelers_1 = require("./travelers");
exports.Flight = db.define('flight', {
    flightNum: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    airlineCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['arrived', 'delayed', 'scheduled'],
        defaultValue: 'scheduled'
    },
    arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    classMethods: {
        findFlightsToLand: function () {
            const now = new Date();
            return exports.Flight.findAll({
                where: {
                    arrivalTime: {
                        $lt: now
                    },
                    status: 'scheduled'
                }
            })
                .then(flights => flights)
                .catch(err => console.error(err));
        }
    },
    instanceMethods: {
        landFlight: function () {
            return this.update({ status: 'arrived' })
                .then(flight => {
                return travelers_1.Traveler.update({ status: 'unconfirmed' }, { where: { flightId: flight.id }, returning: true });
            })
                .spread((count, travelers) => travelers)
                .catch(err => console.error(err));
        }
    }
});
//# sourceMappingURL=flights.js.map