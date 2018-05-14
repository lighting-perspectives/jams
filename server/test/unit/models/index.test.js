/* eslint-disable no-undef, no-unused-expressions */
const expect = require('chai').expect

describe('models/index', function () {
  it('should return the Sample model', function () {
    const models = require('../../../models')
    expect(models.Sample).to.exist
  })

  it('should return the InstrumentMapping model', function () {
    const models = require('../../../models')
    expect(models.InstrumentMapping).to.exist
  })

  it('should return the Instrument model', function () {
    const models = require('../../../models')
    expect(models.Instrument).to.exist
  })
})
