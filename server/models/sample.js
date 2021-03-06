const { afterDestroy } = require('./hooks/sample')

module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define('Sample', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    container: { // mp4', aac
      type: DataTypes.STRING,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING
    },
    label: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      afterDestroy
    }
  })

  // Sample.associate = function (models) {
  //   Sample.belongsToMany(models.InstrumentMapping, {
  //     through: 'Mappings_Samples',
  //     foreignKey: 'sampleId'
  //   })
  // }

  return Sample
}
