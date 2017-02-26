const Sequelize = require('sequelize');
const db = require('../db');

const Traveler = db.define('traveler', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: true
    }
  },
  phone : {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notEmpty:true
    }
  },
  connectivity : {
    type: Sequelize.BOOLEAN
  },
  nationality: {
    type: Sequelize.STRING
  },
  secondaryContact: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM,
    values: ['transit', 'unconfirmed','detained','cleared'],
    defaultValue: 'unconfirmed'
  },
}, {
  underscored: true
});

module.exports = Traveler;
