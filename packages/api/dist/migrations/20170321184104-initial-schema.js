'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salt: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
        })
            .then(() => {
            return queryInterface.createTable('flight', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                flightNum: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                airlineCode: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.ENUM,
                    values: ['arrived', 'delayed', 'scheduled'],
                    defaultValue: 'scheduled'
                },
                arrivalTime: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
            });
        })
            .then(() => {
            queryInterface.createTable('traveler', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                nationality: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                phone: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                connectivity: {
                    type: Sequelize.BOOLEAN
                },
                secondaryContactPhone: {
                    type: Sequelize.STRING
                },
                secondaryContactName: {
                    type: Sequelize.STRING
                },
                secondaryContactRelation: {
                    type: Sequelize.STRING
                },
                requireInterpreter: {
                    type: Sequelize.BOOLEAN
                },
                preferredLanguage: {
                    type: Sequelize.STRING
                },
                status: {
                    type: Sequelize.ENUM,
                    values: ['transit', 'unconfirmed', 'detained', 'at risk', 'cleared'],
                    defaultValue: 'transit'
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                flightId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'flight',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'set null'
                }
            });
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('traveler')
            .then(() => {
            return queryInterface.dropTable('flight');
        })
            .then(() => {
            return queryInterface.dropTable('user');
        });
    }
};
//# sourceMappingURL=20170321184104-initial-schema.js.map