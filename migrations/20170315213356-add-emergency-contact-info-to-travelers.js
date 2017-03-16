'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    // is async for some reason, so needs to call done.
    queryInterface.renameColumn('traveler', 'secondaryContact', 'secondaryContactPhone', {logging: console.log});

    queryInterface.addColumn(
      'traveler',
      'secondaryContactName',
      Sequelize.STRING,
      {logging: console.log}
    );

    queryInterface.addColumn(
      'traveler',
      'secondaryContactRelation',
      Sequelize.STRING,
      {logging: console.log}
    );
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.renameColumn('traveler', 'secondaryContactPhone', 'secondaryContact', { logging: console.log });

    queryInterface.removeColumn('traveler', 'secondaryContactName', {logging: console.log});

    queryInterface.removeColumn('traveler', 'secondaryContactRelation', {logging: console.log});
  }
};
