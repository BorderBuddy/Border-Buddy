'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {

    //Add requireInterpreter column
    queryInterface.addColumn(
      'traveler',
      'requireInterpreter',
      Sequelize.BOOLEAN,
      {logging: console.log}
    );

    //Add preferredLanguage
    queryInterface.addColumn(
      'traveler',
      'preferredLanguage',
      Sequelize.STRING,
      {logging: console.log}
    );

    done();

  },

  down: function (queryInterface, Sequelize, done) {

    //Add requireInterpreter column
    queryInterface.removeColumn('traveler', 'requireInterpreter', {logging: console.log});

    //Add preferredLanguage
    queryInterface.removeColumn('traveler', 'preferredLanguage', {logging: console.log});

    done();
  }
};
