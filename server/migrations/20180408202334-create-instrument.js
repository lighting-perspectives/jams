module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Instruments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            label: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Instruments', {});
    }
};