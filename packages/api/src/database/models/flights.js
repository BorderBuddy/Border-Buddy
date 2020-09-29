import { Traveler } from './travelers'
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const db = require('../db')

export const Flight = db.define('flight', {
  flightNum: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  airlineCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM,
    values: ['arrived', 'delayed', 'scheduled'],
    defaultValue: 'scheduled',
  },
  scheduledArrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  actualArrivalTime: {
    type: Sequelize.DATE,
  },
})

Flight.findFlightsToLand = () => {
  const now = new Date()
  return Flight.findAll({
    where: {
      scheduledArrivalTime: {
        [Op.lt]: now,
      },
      status: 'scheduled',
    },
  })
}

Flight.prototype.landFlight = async function () {
  this.status = 'arrived'
  await this.save()
  return Traveler.update(
    { status: 'unconfirmed' },
    { where: {
      flightId: this.id,
      status: 'transit',
    },
    returning: true })
    .spread((count, travelers) => travelers)
}
