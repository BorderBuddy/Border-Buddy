import { Traveler } from './travelers'
const Sequelize = require('sequelize')
const db = require('../db')

export const Flight = db.define('flight', {
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
    values: ['arrived', 'delayed', 'scheduled'],
    defaultValue: 'scheduled'
  },
  scheduledArrivalTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  actualArrivalTime: {
    type: Sequelize.DATE
  }
})

Flight.findFlightsToLand = () => {
  const now = new Date()

  return Flight.findAll({
    where: {
      scheduledArrivalTime: {
        $lt: now
      },
      status: 'scheduled'
    }
  })
    .then(flights => flights)
    .catch(err => console.error(err))
}

Flight.prototype.landFlight = () => {
  return this.update({ status: 'arrived' })
    .then(flight => {
      return Traveler.update(
        { status: 'unconfirmed' },
        { where: { flightId: flight.id }, returning: true })
    })
    .spread((count, travelers) => travelers)
    .catch(err => console.error(err))
}
