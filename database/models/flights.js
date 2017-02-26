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
}, {
  underscored: true
});

module.exports = Flight;
