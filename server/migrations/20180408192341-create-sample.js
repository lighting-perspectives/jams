module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Samples', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      path: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      container: {
        type: Sequelize.STRING,
        allowNull: false
      },
      group: {
        type: Sequelize.STRING,
        allowNull: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Samples', {})
  }
}
