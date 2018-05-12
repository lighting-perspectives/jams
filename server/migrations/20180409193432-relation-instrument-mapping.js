'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('InstrumentMappings', 'instrumentId', {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Instruments',
        key: 'id',
        as: 'instrumentId'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('InstrumentMappings', 'instrumentId')
  }
}
