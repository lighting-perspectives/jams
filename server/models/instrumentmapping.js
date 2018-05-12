module.exports = (sequelize, DataTypes) => {
  const InstrumentMapping = sequelize.define('InstrumentMapping', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    lowerLimit: {
      allowNull: false,
      type: DataTypes.STRING
    },
    upperLimit: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {})

  InstrumentMapping.associate = function (models) {
    InstrumentMapping.belongsToMany(models.Sample, {
      through: 'Mappings_Samples',
      foreignKey: 'instrumentMappingId'
    })

    InstrumentMapping.belongsTo(models.Instrument, {
      foreignKey: 'instrumentId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    })
  }

  return InstrumentMapping
}
