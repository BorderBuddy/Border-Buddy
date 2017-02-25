const Sequelize = require('sequelize');
const db = require('../db');

const Traveler = db.define('traveler', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: true
    }
  },
  Phone : {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notEmpty:true
    }
  },
  Connectivity : {
    type: Sequelize.BOOLEAN
  },
  Nationality: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['transit', 'uncomfirmed','detained','cleared'],
    defaultValue: 'uncomfirmed'
  },
}, {
  underscored: true
});

module.exports = Traveler;
