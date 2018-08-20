module.exports = (sequelize, DataTypes) => {
  const Instrument = sequelize.define('Instrument', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    label: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {})
  Instrument.associate = (models) => {
    Instrument.hasMany(models.InstrumentMapping, {
      as: 'mappings',
      foreignKey: 'instrumentId'
    })
  }
  return Instrument
}
