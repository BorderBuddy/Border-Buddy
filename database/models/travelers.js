const Sequelize = require('sequelize');
const db = require('../db');

const Traveler = db.define('traveler', {
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
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  connectivity: {
    type: Sequelize.BOOLEAN
  },
  secondaryContact: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['transit', 'unconfirmed', 'detained', 'at risk', 'cleared'],
    defaultValue: 'transit'
  },
}, {
  underscored: true
});

module.exports = Traveler;
