/* eslint-disable no-undef,no-unused-expressions */
const path = require('path')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../../bin/www')
const fixtures = require('../data/fixtures')

describe('/api/samples', function () {
  beforeEach(() => {
    this.Sample = require('../../models').Sample
    this.InstrumentMapping = require('../../models').InstrumentMapping
    this.Instrument = require('../../models').Instrument
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Sample).to.exist
    expect(this.InstrumentMapping).to.exist
    expect(this.Instrument).to.exist
    expect(this.ValidationError).to.exist

    return require('../../models').sequelize
      .sync({force: true, logging: false})
      .then(() => {
        console.log('db synced')
        return this.Sample
          .bulkCreate(fixtures.samples)
          .then((samples) => {
            this.samples = samples

            return this.Instrument.bulkCreate(fixtures.instruments)
          })
          .then(() => console.log('Fixtures loaded'))
      })
  })

  it('should GET /api/samples', () => {
    return request(app)
      .get('/api/samples')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => expect(res.body).to.be.an('array'))
  })

  it('should GET /api/samples/:id', () => {
    return request(app)
      .get('/api/samples/0f1ed577-955a-494d-868c-cf4dc5c3c892')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.equal('0f1ed577-955a-494d-868c-cf4dc5c3c892')
      })
  })

  it('should POST /api/samples', function () {
    return request(app)
      .post('/api/samples')
      .attach('audioFile', path.join(__dirname, '../data/files/CB.WAV'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.path).to.equal(path.join(__dirname, '../data/files/CB.WAV'))
        expect(res.body.filename).to.equal('CB.WAV')
      })
  })

  it('should return 500 POST /api/samples when audioFile is not a audio file', () => {
    return request(app)
      .post('/api/samples')
      .attach('audioFile', path.join(__dirname, '../data/files/dummy.txt'))
      .set('Accept', 'application/json')
      .expect(500)
  })

  it('should PUT /api/samples/:id', () => {
    return request(app)
      .put('/api/samples/0f1ed577-955a-494d-868c-cf4dc5c3c892')
      .attach('audioFile', path.join(__dirname, '../data/files/CB.WAV'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.path).to.equal(path.join(__dirname, '../data/files/CB.WAV'))
        expect(res.body.filename).to.equal('CB.WAV')
      })
  })
})
