const Sequelize = require('sequelize');
const db = require('../db');
const Flight = require('./flights');

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
  underscored: true,

  classMethods: {

    setToAtRisk: function() {
      return Traveler.update(
        { status: 'at risk' },
        { where: { status: 'unconfirmed' }, returning: true }
      )
      .spread((count, travelers) => travelers) // TODO: email this info to admins / lawyers
      .catch(err => console.error(err));
    },

    getAllRecentArrivals: function() {
      
      const currTime = new Date();

      return Traveler.findAll({
        include: [
          { model: Flight,
            where: {
              arrivalTime: {

              }
            }
          }
        ]
      })
      .then(travelers => console.log('-------------------LOOGIT ', travelers))
      .catch(err => console.error(err));
    }
  }
});

module.exports = Traveler;
