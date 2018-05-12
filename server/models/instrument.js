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
  Instrument.associate = function (models) {
    // Instrument.hasMany(models.InstrumentMapping, {
    //     // as: 'Mapping',
    //     foreignKey: 'instrumentId',
    //     sourceKey: 'id'
    // });
  }
  return Instrument
}
