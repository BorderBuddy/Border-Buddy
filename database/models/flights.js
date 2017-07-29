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
      const today = new Date();

      return Flight.findAll({
        where: {
          arrivalTime: {
            $lt: today
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
        .then(travelers => travelers[1])
        .catch(err => console.error(err));
    }
  }

});
