import { Flight } from './flights'

const Sequelize = require('sequelize')
const db = require('../db')

export const Traveler = db.define('traveler', {
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
    type: Sequelize.STRING
  },
  countryCode: {
    type: Sequelize.STRING
  },
  connectivity: {
    type: Sequelize.BOOLEAN
  },
  secondaryContactPhone: {
    type: Sequelize.STRING
  },
  secondaryContactName: {
    type: Sequelize.STRING
  },
  secondaryContactRelation: {
    type: Sequelize.STRING
  },
  requireInterpreter: {
    type: Sequelize.BOOLEAN
  },
  preferredLanguage: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM,
    values: ['transit', 'unconfirmed', 'detained', 'at risk', 'cleared'],
    defaultValue: 'transit'
  }
})

Traveler.setToAtRisk = () => {
  return Traveler.update(
    { status: 'at risk' },
    { where: { status: 'unconfirmed' }, returning: true }
  )
    .spread((count, travelers) => travelers)
    .catch(err => console.error(err))
}

Traveler.orderByArrival = () => {
  return Traveler.findAll({
    include: [{ all: true }],
    order: [[Flight, 'arrivalTime', 'DESC']]
  })
}
