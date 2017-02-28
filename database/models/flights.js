const Sequelize = require('sequelize');
const db = require('../db');

const Flight = db.define('flight', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
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
    values: ['arrived', 'delayed','scheduled'],
    defaultValue: 'scheduled'
  },
  departureDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  arrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {
  underscored: true
});

module.exports = Flight;
