const Sequelize = require('sequelize');
const db = require('../db');
import {Traveler} from './travelers';

export const Flight = db.define('flight', {
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
    values: ['arrived', 'delayed', 'scheduled'], // arrived means landed + 2hrs. want to change this.
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

      return Flight.findAll({
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
      return this.update({status: 'arrived'})
        .then(flight => {
          return Traveler.update(
            {status: 'unconfirmed'},
            {where: {flightId: flight.id}, returning: true});
        })
        .spread((count, travelers) => travelers)
        .catch(err => console.error(err));
    }
  }

});
