const Sequelize = require('sequelize');
const db = require('../db');
const Traveler = require('./travelers');


const Flight = db.define('flight', {
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
    values: ['arrived', 'delayed', 'scheduled'], // arrived means landed >2hrs ago
    defaultValue: 'scheduled'
  },
  arrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {
  underscored: true,

  classMethods: {
    findFlightsToLand: function() {
      const oneDay = 24 * 60 * 60 * 1000;
      const today = new Date();
      const yesterday = new Date(today - oneDay);

      return Flight.findAll({
        where: {
          arrivalTime: {
            $lt: today,
            $gt: yesterday
          },
          status: 'scheduled'
        }
      })
      .then(flights => flights)
      .catch(err => console.error(err));
    }

  },

  instanceMethods: {
    landFlight: function() {
      return this.update({ status: 'arrived' })
      .then(flight => {
        return Traveler.update(
        { status: 'unconfirmed' },
        { where: { flight_id: flight.id }, returning: true });
      })
      .then(travelers => travelers[1])
      .catch(err => console.error(err));
    }
  }

});

module.exports = Flight;
