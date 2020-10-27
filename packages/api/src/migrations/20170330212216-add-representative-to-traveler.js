'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'traveler',
      'representative',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      }
    )
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'traveler',
      'representative')
  }
}
