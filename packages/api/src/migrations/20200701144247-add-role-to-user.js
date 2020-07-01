'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'user',
      'role',
      {
        type: Sequelize.ENUM,
        values: ['admin', 'regionalCoordinator', 'lawyer'],
        defaultValue: 'admin'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'user',
      'role'
    )
  }
}
