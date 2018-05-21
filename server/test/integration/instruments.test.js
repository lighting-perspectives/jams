/* eslint-disable no-undef,no-unused-expressions */
const request = require('supertest')
const expect = require('chai').expect

const app = require('../../bin/www')
const fixtures = require('../data/fixtures')

describe('/api/instruments', () => {
  beforeEach(() => {
    this.Instrument = require('../../models').Instrument
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Instrument).to.exist
    expect(this.ValidationError).to.exist

    return require('../../models').sequelize
      .sync({force: true, logging: false})
      .then(() => {
        console.log('db synced')
        return this.Instrument.bulkCreate(fixtures.instruments)
      })
      .then(() => console.log('Fixtures loaded'))
  })

  it('should return 200 on GET /api/instruments', () => {
    return request(app)
      .get('/api/instruments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(2)
      })
  })

  it('should return 200 GET /api/instruments/:id', () => {
    return request(app)
      .get('/api/instruments/a35c6ac4-53f7-49b7-82e3-7a0aba5c2c45')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.equal('a35c6ac4-53f7-49b7-82e3-7a0aba5c2c45')
      })
  })

  it('should return 404 on GET /api/instruments/:id when id is unknown', () => {
    return request(app)
      .get('/api/instruments/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('Failed to retrieve instrument n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })

  it('should return 201 on POST /api/instruments', () => {
    return request(app)
      .post('/api/instruments')
      .send({label: 'foo'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.label).to.equal('foo')
      })
  })

  it('should return 200 on PUT /api/instruments/:id', () => {
    return request(app)
      .put('/api/instruments/d83ffbeb-8fe3-4ca9-8d89-e1c6de86c4df')
      .send({label: 'bar'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.label).to.equal('bar')
      })
  })

  it('should return 4040 on PUT when id is unknown', () => {
    return request(app)
      .put('/api/instruments/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .send({label: 'baz'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('Failed to retrieve instrument n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })
})
