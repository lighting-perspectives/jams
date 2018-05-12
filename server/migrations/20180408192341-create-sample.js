module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Samples', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      container: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('Samples', {})
  }
}
