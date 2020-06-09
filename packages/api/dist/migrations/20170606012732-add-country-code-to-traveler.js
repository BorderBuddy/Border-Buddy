'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('traveler', 'countryCode', {
            type: Sequelize.STRING
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('traveler', 'countryCode');
    }
};
//# sourceMappingURL=20170606012732-add-country-code-to-traveler.js.map