const Sequelize = require('sequelize');
const db = require('../db');

const Flight = db.define('flight', {
  flightNum: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM,
    values: ['arrived', 'delayed','scheduled'],
    defaultValue: 'scheduled'
  },
  arrivalDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  underscored: true
});

module.exports = Flight;
