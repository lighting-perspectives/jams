/* eslint-disable no-undef,no-unused-expressions */
const request = require('supertest')
const expect = require('chai').expect

const app = require('../../bin/www')
const fixtures = require('../data/fixtures')

describe('/api/mappings', () => {
  beforeEach(() => {
    this.Sample = require('../../models').Sample
    this.Instrument = require('../../models').Instrument
    this.InstrumentMapping = require('../../models').InstrumentMapping
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Sample).to.exist
    expect(this.Instrument).to.exist
    expect(this.InstrumentMapping).to.exist
    expect(this.ValidationError).to.exist

    return require('../../models').sequelize
      .sync({force: true, logging: false})
      .then(() => {
        console.log('db synced')
        return this.Sample
          .bulkCreate(fixtures.samples)
      })
      .then(samples => {
        this.samples = samples

        return this.Instrument
          .bulkCreate(fixtures.instruments)
      })
      .then(instruments => {
        return this.InstrumentMapping.bulkCreate(fixtures.instrumentMappings)
      })
      .then(() => console.log('Fixtures loaded'))
  })

  it('should return 201 on POST /api/mappings', () => {
    return request(app)
      .post('/api/mappings')
      .send({
        lowerRank: 55,
        upperRank: 56,
        referenceRank: 55,
        sampleId: '636f247a-dc88-4b52-b8e8-78448b5e5790',
        instrumentId: '85918ef7-06d0-4e61-b798-85514573f226'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body, 'body should be an object')
        expect(res.body.lowerRank, 'lowerRank should equal 55').to.equal(55)
        expect(res.body.upperRank, 'upperRank should equal 56').to.equal(56)
        expect(res.body.referenceRank, 'referenceRank should equal 55').to.equal(55)
        expect(res.body.sampleId).to.equal('636f247a-dc88-4b52-b8e8-78448b5e5790', 'sampleId should equal 636f247a-dc88-4b52-b8e8-78448b5e5790')
        expect(res.body.instrumentId).to.equal('85918ef7-06d0-4e61-b798-85514573f226', 'instrumentId should equal 85918ef7-06d0-4e61-b798-85514573f226')
      })
  })

  it('should return 200 on PUT /api/mappings/:id', () => {
    return request(app)
      .put('/api/mappings/712fda5f-3ff5-4e23-8949-320a96e0d565')
      .send({
        sampleId: '0f1ed577-955a-494d-868c-cf4dc5c3c892',
        instrumentId: 'd83ffbeb-8fe3-4ca9-8d89-e1c6de86c4df'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.sampleId).to.equal('0f1ed577-955a-494d-868c-cf4dc5c3c892', 'sampleId should equal 0f1ed577-955a-494d-868c-cf4dc5c3c892')
        expect(res.body.instrumentId).to.equal('d83ffbeb-8fe3-4ca9-8d89-e1c6de86c4df', 'instrumentId should equal d83ffbeb-8fe3-4ca9-8d89-e1c6de86c4df')
      })
  })

  it('should return 404 on PUT /api/mappings/:id when id is unknown', () => {
    return request(app)
      .put('/api/mappings/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .send({
        sampleId: '0f1ed577-955a-494d-868c-cf4dc5c3c892',
        instrumentId: 'd83ffbeb-8fe3-4ca9-8d89-e1c6de86c4df'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body, 'body should be a object').to.be.an('object')
        expect(res.body.message, 'expected error message').to.equal('Failed to retrieve instrument mapping n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })

  it('should return 204 on DELETE /api/mappings/:id', () => {
    return request(app)
      .delete('/api/mappings/712fda5f-3ff5-4e23-8949-320a96e0d565')
      .expect(204)
      .then((res) => {
        expect(res.body, 'body should be empty').to.be.empty
      })
  })

  it('should return 404 on DELETE /api/mappings/:id when id is unknown', () => {
    return request(app)
      .delete('/api/mappings/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body, 'body should be a object').to.be.an('object')
        expect(res.body.message, 'expected error message').to.equal('Failed to retrieve instrument mapping n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })
})
