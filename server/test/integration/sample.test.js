/* eslint-disable no-undef,no-unused-expressions */
const path = require('path')
const fs = require('fs')
const request = require('supertest')
const expect = require('chai').expect

const app = require('../../bin/www')
const fixtures = require('../data/fixtures')

const copyFiles = (filename) => {
  let fxt = fixtures.samples

  if (filename) {
    fxt = fxt.filter(sample => sample.filename === filename)
  }

  let promises = []

  for (const fixture of fxt) {
    if (fs.existsSync(fixture.path)) {
      console.log('--File %s already exists, skipping', fixture.path)
      continue
    }

    const promise = new Promise((resolve, reject) => {
      fs.createReadStream(fixture.originalPath)
        .on('error', (err) => {
          console.log('Failed to read file at %s', fixture.originalPath, err.message)
          return reject(err)
        })
        .pipe(fs.createWriteStream(fixture.path))
        .on('error', (err) => {
          console.log('Failed to write file at %s', fixture.path, err.message)
          return reject(err)
        })
        .on('finish', () => {
          console.log('--File copied at %s', fixture.path)
          return resolve(fixture.path)
        })
    })
    promises.push(promise)
  }

  return Promise.all(promises)
}

const emptyDir = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err
      })
    }
  })
}

describe('/api/samples', () => {
  beforeEach(() => {
    this.Sample = require('../../models').Sample
    this.ValidationError = require('../../models').sequelize.ValidationError

    expect(this.Sample).to.exist
    expect(this.ValidationError).to.exist

    emptyDir(path.join(__dirname, '../data/audio'))

    return require('../../models').sequelize
      .sync({force: true, logging: false})
      .then(() => {
        console.log('--Db synced')
        return this.Sample
          .bulkCreate(fixtures.samples)
          .catch(error => { throw error })
      })
      .then(() => console.log('--Fixtures loaded in db'))
      .catch(error => { throw error })
  })

  it('should return 200 on GET /api/samples', () => {
    copyFiles().then(() => console.log('--Files copied'))

    return request(app)
      .get('/api/samples')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body, 'body should be an array').to.be.an('array')
        expect(res.body, 'body should contain 5 elements').to.have.lengthOf(5)
      })
  })

  it('should return 200 on GET /api/samples?group=:group', () => {
    copyFiles().then(() => console.log('--Files copied'))

    return request(app)
      .get('/api/samples')
      .query({group: 'TR808'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(2)
        expect(res.body[0]).to.include({group: 'TR808'})
        expect(res.body[1]).to.include({group: 'TR808'})
      })
  })

  it('should return 200 on GET /api/samples/:id', () => {
    copyFiles('BD0000.WAV').then(() => console.log('--File copied'))

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
        expect(res.body).to.include({
          msg: 'Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c',
          name: 'DatabaseError'
        })
      })
  })

  it('should return 201 on POST /api/samples', () => {
    return request(app)
      .post('/api/samples')
      .field('label', 'foo')
      .field('group', 'bar')
      .field('container', 'wav')
      .attach('audioFile', path.join(__dirname, '../data/samples/sample.wav'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          filename: 'sample.wav',
          container: 'wav',
          label: 'foo',
          group: 'bar'
        })
      })
  })

  it('should return 201 on POST /api/samples with default field values', () => {
    return request(app)
      .post('/api/samples')
      .attach('audioFile', path.join(__dirname, '../data/samples/sample.wav'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body, 'body should be a object').to.be.an('object')
        expect(res.body).to.include({
          filename: 'sample.wav',
          container: 'WAV',
          label: 'sample.wav',
          group: 'default'
        })
      })
  })

  it('should return 400 on POST /api/samples when audioFile is not an audio file', () => {
    return request(app)
      .post('/api/samples')
      .attach('audioFile', path.join(__dirname, '../data/samples/dummy.txt'))
      .set('Accept', 'application/json')
      .expect(400)
  })

  it('should return 200 on PUT /api/samples/:id', () => {
    copyFiles('DnBk1DHitA-Hat03.wav').then(() => console.log('--File copied'))

    return request(app)
      .put('/api/samples/636f247a-dc88-4b52-b8e8-78448b5e5790')
      .field('label', 'New label')
      .field('group', 'New group')
      .attach('audioFile', path.join(__dirname, '../data/files/DnBk1DHitA-Hat01.wav'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          path: path.join(__dirname, '../data/audio/636f247a-dc88-4b52-b8e8-78448b5e5790'),
          filename: '636f247a-dc88-4b52-b8e8-78448b5e5790',
          label: 'New label',
          group: 'New group'
        })
      })
  })

  it('should return 404 on PUT /api/samples/:id when id is unknown', () => {
    return request(app)
      .put('/api/samples/bb459a9e-0d2c-4da1-b538-88ea43d30f8c')
      .attach('audioFile', path.join(__dirname, '../data/samples/sample.wav'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          msg: 'Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c',
          name: 'DatabaseError'
        })
      })
  })

  it('should return 204 on DELETE /api/samples/:id', () => {
    const fileToDelete = path.join(__dirname, '../data/audio/8554f77b-d395-490b-ab84-5b50d809b7af')

    copyFiles('DnBk1DHitA-Hat01.wav')
      .then(() => {
        expect(fs.existsSync(fileToDelete), 'File 8554f77b-d395-490b-ab84-5b50d809b7af should exist').to.be.true
      })

    return request(app)
      .delete('/api/samples/8554f77b-d395-490b-ab84-5b50d809b7af')
      .expect(204)
      .then((res) => {
        expect(res.body).to.be.empty
        expect(fs.existsSync(fileToDelete)).to.be.false
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
        expect(res.body).to.include({
          msg: 'Failed to retrieve sample n°bb459a9e-0d2c-4da1-b538-88ea43d30f8c',
          name: 'DatabaseError'
        })
      })
  })
})
