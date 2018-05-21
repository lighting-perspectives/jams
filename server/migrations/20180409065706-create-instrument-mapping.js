module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InstrumentMappings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      lowerRank: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      upperRank: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      referenceRank: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sampleId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Samples',
          key: 'id'
        }
      },
      instrumentId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Instruments',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InstrumentMappings', {})
  }
}
