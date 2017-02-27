const Sequelize = require('sequelize');
const db = require('../db');

const Traveler = db.define('traveler', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
  nationality: {
    type: Sequelize.STRING
  },
  secondaryContact: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['transit', 'unconfirmed', 'detained', 'cleared'],
    defaultValue: 'unconfirmed'
  },
}, {
  underscored: true,

  getterMethods: {
    name: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
});

module.exports = Traveler;
