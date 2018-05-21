/* eslint-disable no-undef, no-unused-expressions */
const expect = require('chai').expect

describe('models', function () {
  beforeEach(function () {
    this.Sample = require('../../models').Sample
    this.InstrumentMapping = require('../../models').InstrumentMapping
    this.Instrument = require('../../models').Instrument
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Sample).to.exist
    expect(this.InstrumentMapping).to.exist
    expect(this.Instrument).to.exist
    expect(this.ValidationError).to.exist

    return require('../../models').sequelize.sync({force: true, logging: false})
  })

  it('should create a sample and then destroy it', function () {
    return this.Sample
      .create({
        id: 'd5ff395d-62a2-43c7-a341-69e6269361e6',
        path: 'test',
        filename: 'test.wav',
        container: 'mp4'
      })
      .bind(this)
      .then(function (sample) {
        expect(sample.id).to.equal('d5ff395d-62a2-43c7-a341-69e6269361e6')
        expect(sample.path).to.equal('test')
        expect(sample.filename).to.equal('test.wav')
        expect(sample.container).to.equal('mp4')
      })
      .then(function () {
        return this.Sample.destroy({
          where: {id: 'd5ff395d-62a2-43c7-a341-69e6269361e6'}
        })
      })
      .then(function () {
        return this.Sample.findById('d5ff395d-62a2-43c7-a341-69e6269361e6')
      })
      .then(function (s) {
        expect(s).to.be.null
      })
  })

  it('should create an Instrument and then destroy it', function () {
    return this.Instrument.create({
      id: 'ced890ab-9246-4b50-8037-42eaf8b578c4',
      label: 'Instrument Foo'
    })
      .bind(this)
      .then(function (instrument) {
        expect(instrument).not.to.be.null
        expect(instrument.id).to.equal('ced890ab-9246-4b50-8037-42eaf8b578c4')
        expect(instrument.label).to.equal('Instrument Foo')
      })
      .then(function () {
        return this.Instrument.destroy({
          where: {id: 'ced890ab-9246-4b50-8037-42eaf8b578c4'}
        })
      })
      .bind(this)
      .then(function () {
        return this.Instrument.findById('ced890ab-9246-4b50-8037-42eaf8b578c4')
      })
      .then(function (instrument) {
        expect(instrument).to.be.null
      })
  })

  it('should create an Instrument with a mapping and its sample', function () {
    return this.Sample
      .create({
        id: '2d86f0a1-39b7-42b4-9acd-86cf825f2206',
        path: 'bar',
        filename: 'bar.wav',
        container: 'mp4'
      })
      .bind(this)
      .then(function (sample) {
        expect(sample).not.to.be.null
        expect(sample.id).to.equal('2d86f0a1-39b7-42b4-9acd-86cf825f2206')
        expect(sample.path).to.equal('bar')
        expect(sample.filename).to.equal('bar.wav')
        expect(sample.container).to.equal('mp4')
        this.testSample = sample

        return this.Instrument.create({
          id: 'aaac43b4-8d19-4b93-9aab-3b6b78558b1e',
          label: 'Instrument Foo'
        })
      })
      .then(function (instrument) {
        expect(instrument).not.to.be.null
        expect(instrument.id).to.equal('aaac43b4-8d19-4b93-9aab-3b6b78558b1e')
        expect(instrument.label).to.equal('Instrument Foo')

        return this.InstrumentMapping.create({
          id: 'a4a305a9-e33b-4e39-990b-17a3a07e36d5',
          lowerRank: 30,
          upperRank: 50,
          referenceRank: 40,
          sampleId: this.testSample.id,
          instrumentId: instrument.id
        })
      })
      .then(function (mapping) {
        expect(mapping).not.to.be.null
        expect(mapping.id).to.equal('a4a305a9-e33b-4e39-990b-17a3a07e36d5')
        expect(mapping.lowerRank).to.equal(30)
        expect(mapping.upperRank).to.equal(50)
        expect(mapping.referenceRank).to.equal(40)
        expect(mapping.sampleId).to.equal('2d86f0a1-39b7-42b4-9acd-86cf825f2206')
        expect(mapping.instrumentId).to.equal('aaac43b4-8d19-4b93-9aab-3b6b78558b1e')

        return this.Instrument.destroy({
          where: {id: 'aaac43b4-8d19-4b93-9aab-3b6b78558b1e'}
        })
      })
      .then(function () {
        return this.Instrument.findById('aaac43b4-8d19-4b93-9aab-3b6b78558b1e')
      })
      .then(function (i) {
        expect(i).to.be.null

        return this.InstrumentMapping.findAll({
          where: {instrumentId: 'aaac43b4-8d19-4b93-9aab-3b6b78558b1e'}
        })
      })
      .then(function (result) {
        expect(result).to.empty

        return this.Sample.destroy({
          where: {id: '2d86f0a1-39b7-42b4-9acd-86cf825f2206'}
        })
      })
  })

  it('should fail to create an instrument mapping without instrument', function () {
    return this.Sample
      .create({
        id: 'a2bd0552-0b67-4379-879e-cfdf780a2882',
        path: 'baz',
        filename: 'baz.wav',
        container: 'mp4'
      })
      .bind(this)
      .then(function () {
        return this.InstrumentMapping.create({
          id: '05e739d4-11ed-4a41-a256-700bcc18dd81',
          lowerRank: 45,
          upperRank: 45,
          referenceRank: 45
        })
      })
      .catch(function (err) {
        expect(err).to.be.an.instanceOf(this.ValidationError)
      })
  })

  it('should fail to create an instrument mapping without sample', function () {
    return this.Instrument
      .create({
        id: '00c4bb8a-901a-4413-9dcf-5703b3707043',
        label: 'test'
      })
      .bind(this)
      .then(function () {
        return this.InstrumentMapping.create({
          id: '8e012b65-6de1-42e3-aaed-327ca784f47c',
          lowerRank: 45,
          upperRank: 45,
          referenceRank: 45
        })
      })
      .catch(function (err) {
        expect(err).to.be.an.instanceOf(this.ValidationError)
      })
  })
})
