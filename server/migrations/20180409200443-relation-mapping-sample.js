'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Mappings_Samples',
      {
        instrumentMappingId: {
          type: Sequelize.UUID,
          primaryKey: 'mapping_sample_pkey',
          references: {
            model: 'InstrumentMappings',
            key: 'id'
          }
        },
        sampleId: {
          type: Sequelize.UUID,
          primaryKey: 'mapping_sample_pkey',
          references: {
            model: 'Samples',
            key: 'id'
          }
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Mappings_Samples', {})
  }
}
