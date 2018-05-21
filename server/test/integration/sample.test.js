/* eslint-disable no-undef,no-unused-expressions */
const path = require('path')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../../bin/www')
const fixtures = require('../data/fixtures')

describe('/api/samples', () => {
  beforeEach(() => {
    this.Sample = require('../../models').Sample
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Sample).to.exist
    expect(this.ValidationError).to.exist

    return require('../../models').sequelize
      .sync({force: true, logging: false})
      .then(() => {
        console.log('db synced')
        return this.Sample.bulkCreate(fixtures.samples)
      })
      .then(() => console.log('Fixtures loaded'))
  })

  it('should return 200 on GET /api/samples', () => {
    return request(app)
      .get('/api/samples')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(2)
      })
  })

  it('should return 200 on GET /api/samples/:id', () => {
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

  it('should return 404 on GET /api/samples/:id when id is unknown', () => {
    return request(app)
      .get('/api/samples/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })

  it('should return 201 on POST /api/samples', () => {
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

  it('should return 500 on POST /api/samples when audioFile is not an audio file', () => {
    return request(app)
      .post('/api/samples')
      .attach('audioFile', path.join(__dirname, '../data/files/dummy.txt'))
      .set('Accept', 'application/json')
      .expect(500)
  })

  it('should return 200 on PUT /api/samples/:id', () => {
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

  it('should return 404 on PUT /api/samples/:id when id is unknown', () => {
    return request(app)
      .put('/api/samples/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .attach('audioFile', path.join(__dirname, '../data/files/CB.WAV'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })

  it('should return 204 on DELETE /api/samples/:id', () => {
    return request(app)
      .delete('/api/samples/704a3bc4-ff5f-4290-b891-6d24d16c47b9')
      .expect(204)
      .then((res) => {
        expect(res.body).to.be.empty
      })
  })

  it('should return 404 on DELETE /api/samples/:id when id is unknown', () => {
    return request(app)
      .delete('/api/samples/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      })
  })
})
