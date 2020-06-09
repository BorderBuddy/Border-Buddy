'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('traveler', 'phone', {
            type: Sequelize.STRING
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('traveler', 'phone', {
            type: Sequelize.STRING
        });
    }
};
//# sourceMappingURL=20170330200652-allow-null-phone-no.js.map