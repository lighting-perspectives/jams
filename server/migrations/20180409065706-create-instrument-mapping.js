module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InstrumentMappings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      lowerLimit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      upperLimit: {
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
      // instrumentId: {
      //     type: Sequelize.UUID,
      //     onDelete: 'CASCADE',
      //     references: {
      //         model: 'Instrument',
      //         key: 'id',
      //         as: 'instrumentId',
      //     },
      // },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InstrumentMappings')
  }
}
