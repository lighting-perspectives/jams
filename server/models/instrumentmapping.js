module.exports = (sequelize, DataTypes) => {
  const InstrumentMapping = sequelize.define('InstrumentMapping', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    lowerRank: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    upperRank: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    referenceRank: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {})

  InstrumentMapping.associate = function (models) {
    // InstrumentMapping.belongsToMany(models.Sample, {
    //   through: 'Mappings_Samples',
    //   foreignKey: 'instrumentMappingId'
    // })

    InstrumentMapping.belongsTo(models.Sample, {
      foreignKey: {
        name: 'sampleId',
        allowNull: false
      },
      sourceKey: 'id',
      onDelete: 'CASCADE'
    })

    InstrumentMapping.belongsTo(models.Instrument, {
      foreignKey: {
        name: 'instrumentId',
        allowNull: false
      },
      sourceKey: 'id',
      onDelete: 'CASCADE'
    })
  }

  return InstrumentMapping
}
