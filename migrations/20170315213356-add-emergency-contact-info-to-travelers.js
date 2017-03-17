'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    // because there are async calls, need to call done at the end.
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

    done();
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.renameColumn('traveler', 'secondaryContactPhone', 'secondaryContact', { logging: console.log });

    queryInterface.removeColumn('traveler', 'secondaryContactName', {logging: console.log});

    queryInterface.removeColumn('traveler', 'secondaryContactRelation', {logging: console.log});

    done();
  }
};
