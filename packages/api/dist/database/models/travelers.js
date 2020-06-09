"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traveler = void 0;
const flights_1 = require("./flights");
const Sequelize = require('sequelize');
const db = require('../db');
exports.Traveler = db.define('traveler', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nationality: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    countryCode: {
        type: Sequelize.STRING
    },
    connectivity: {
        type: Sequelize.BOOLEAN
    },
    secondaryContactPhone: {
        type: Sequelize.STRING
    },
    secondaryContactName: {
        type: Sequelize.STRING
    },
    secondaryContactRelation: {
        type: Sequelize.STRING
    },
    requireInterpreter: {
        type: Sequelize.BOOLEAN
    },
    preferredLanguage: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM,
        values: ['transit', 'unconfirmed', 'detained', 'at risk', 'cleared'],
        defaultValue: 'transit'
    }
});
exports.Traveler.setToAtRisk = () => {
    return exports.Traveler.update({ status: 'at risk' }, { where: { status: 'unconfirmed' }, returning: true })
        .spread((count, travelers) => travelers)
        .catch(err => console.error(err));
};
exports.Traveler.orderByArrival = () => {
    return exports.Traveler.findAll({
        include: [{ all: true }],
        order: [[flights_1.Flight, 'arrivalTime', 'DESC']]
    });
};
//# sourceMappingURL=travelers.js.map