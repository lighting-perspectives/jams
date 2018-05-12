'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Mappings_Samples',
      {
        instrumentMappingId: {
          type: Sequelize.UUID,
          primaryKey: 'mapping_sample_pkey'
        },
        sampleId: {
          type: Sequelize.UUID,
          primaryKey: 'mapping_sample_pkey'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Mappings_Samples', {})
  }
}
