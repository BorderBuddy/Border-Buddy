'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'flight',
      'arrivalTime',
      'scheduledArrivalTime'
    )
      .then(() => {
        return queryInterface.addColumn(
          'flight',
          'actualArrivalTime',
          {
            type: Sequelize.DATE
          }
        )
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'flight',
      'scheduledArrivalTime',
      'arrivalTime'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'flight',
          'actualArrivalTime'
        )
      })
  }
}
