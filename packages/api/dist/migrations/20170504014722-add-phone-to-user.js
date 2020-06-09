'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('user', 'phone', {
            type: Sequelize.STRING
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('user', 'phone');
    }
};
//# sourceMappingURL=20170504014722-add-phone-to-user.js.map