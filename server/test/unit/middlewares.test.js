/* eslint-disable no-undef,no-unused-expressions */
const path = require('path')
const expect = require('chai').expect
const sinon = require('sinon')

const NotAudioFileError = require('../../errors/NotAudioFileError')
const DatabaseError = require('../../errors/DatabaseError')

let middlewares, middleware, sample

describe('middlewares', () => {
  beforeEach(() => {
    middlewares = require('../../middlewares')
  })

  it('should return middlewares', () => {
    expect(middlewares).to.exist
  })

  describe('generateUUID', () => {
    beforeEach(() => {
      middleware = middlewares.generateUUID
    })

    it('should be a valid function', () => {
      expect(middleware).to.exist
      expect(typeof middleware).to.equal('function')
      expect(middleware.name).to.equal('generateUUID')
    })

    it('should add a uuid attribute to req', () => {
      const req = {}
      const res = {}
      const next = sinon.spy()

      middleware(req, res, next)

      expect(req).to.have.property('uuid')
      expect(req.uuid).to.have.lengthOf(36)
      expect(next.called).to.be.true
    })
  })

  describe('sample', () => {
    beforeEach(() => {
      sample = middlewares.sample
    })

    it('should exist', () => {
      expect(sample).to.exist
      expect(typeof sample).to.equal('object')
    })

    describe('addSampleInfos', () => {
      beforeEach(() => {
        middleware = middlewares.sampleAddInfos
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('addInfos')
      })

      it('should add infos to sample', () => {
        const req = {}
        const res = {
          extra: {
            sample: {path: path.join(__dirname, '../data/samples/sample.mp3')}
          }
        }
        const next = sinon.spy()

        return middleware(req, res, next)
          .then(() => {
            expect(next.called).to.be.true
            expect(next.args[0][0]).to.be.undefined
            expect(res.extra.sample.path).to.equal(path.join(__dirname, '../data/samples/sample.mp3'))
            expect(res.extra.sample.infos).to.exist
            expect(res.extra.sample.infos).to.have.property('format', 'MP3 (MPEG version 1 Layer III)')
            expect(res.extra.sample.infos).to.have.property('sampleRate', '44100')
            expect(res.extra.sample.infos).to.have.property('bitRate', '128')
            expect(res.extra.sample.infos).to.have.property('channelMode', 'Joint stereo (Stereo)')
          })
      })

      it('should add infos to each sample in samples', () => {
        const req = {}
        const res = {
          extra: {
            samples: [{path: path.join(__dirname, '../data/samples/sample.mp3')}]
          }
        }
        const next = sinon.spy()

        return middleware(req, res, next)
          .then(() => {
            expect(next.called).to.be.true
            expect(next.args[0][0]).to.be.undefined
            expect(res.extra.samples).to.deep.include({
              path: path.join(__dirname, '../data/samples/sample.mp3'),
              infos: {
                format: 'MP3 (MPEG version 1 Layer III)',
                sampleRate: '44100',
                bitRate: '128',
                channelMode: 'Joint stereo (Stereo)'
              }
            })
          })
      })

      it('should failed in neither sample or samples props are present', () => {
        const req = {}
        const res = {extra: {}}
        const next = sinon.spy()

        return middleware(req, res, next)
          .then(() => {
            expect(next.called).to.be.true
            expect(next.args[0][0]).to.be.instanceOf(Error)
          })
      })
    })

    describe('audioFilter', () => {
      beforeEach(() => {
        middleware = middlewares.sample.audioFilter
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('audioFilter')
      })

      const provider = [
        {it: 'should pass when file is wav', name: 'foo.Wav', error: null, result: true},
        {it: 'should pass when file is mp3', name: 'bar.Mp3', error: null, result: true},
        {it: 'should fail when file is not supported', name: 'baz.txt', error: NotAudioFileError, result: false}
      ]

      provider.forEach(entry => {
        it(entry.it, () => {
          const req = {}
          const file = {originalname: entry.name}
          const next = sinon.spy()

          middleware(req, file, next)

          expect(next.called).to.be.true
          expect(next.args[0][1]).to.equal(entry.result)

          if (entry.error) {
            expect(next.args[0][0]).to.be.instanceOf(entry.error)
          } else {
            expect(next.args[0][0]).to.be.null
          }
        })
      })
    })

    describe('destination', () => {
      beforeEach(() => {
        middleware = sample.destination
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('destination')
      })

      it('should return a directory', () => {
        const req = {}
        const res = {}
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.args[0][0]).to.be.null
        expect(typeof next.args[0][1]).to.equal('string')
      })
    })

    describe('filename', () => {
      beforeEach(() => {
        middleware = sample.filename
      })

      it('should filename be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('filename')
      })

      it('should return a uuid as filename (sample creation)', () => {
        const req = {
          uuid: '8515a198-356e-46ce-b58e-2a9f757941a6',
          params: {}
        }
        const res = {}
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.args[0][0]).to.be.null
        expect(next.args[0][1]).to.equal('8515a198-356e-46ce-b58e-2a9f757941a6')
      })

      it('should return a uuid as filename (sample edit)', () => {
        const req = {
          uuid: '8515a198-356e-46ce-b58e-2a9f757941a6',
          params: {id: '981cd289-591c-4681-8df8-e36fd35b95b9'}
        }
        const res = {}
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.args[0][0]).to.be.null
        expect(next.args[0][1]).to.equal('981cd289-591c-4681-8df8-e36fd35b95b9')
      })
    })

    describe('multer', () => {
      beforeEach(() => {
        middleware = sample.multer
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('multerMiddleware')
      })
    })

    describe('send', () => {
      beforeEach(() => {
        middleware = middlewares.sampleSend
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('send')
      })

      it('Response should end when status is 204', () => {
        const req = {}
        const res = {
          statusCode: 204,
          end: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.end.calledOnce).to.be.true
        expect(res.end.firstCall.args[0]).to.be.undefined
      })

      it('Response should send sample extra prop when present', () => {
        const req = {}
        const res = {
          extra: {sample: {id: 'da5d1f0b-48e4-4675-9fb2-6c8cc4c064a7'}},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.sample)
      })

      it('Response should send samples extra prop when present', () => {
        const req = {}
        const res = {
          extra: {samples: [{id: 'da5d1f0b-48e4-4675-9fb2-6c8cc4c064a7'}]},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.samples)
      })

      it('should fail when extra prop is empty', () => {
        const req = {}
        const res = {
          extra: {},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })

      it('should fail when extra prop is missing', () => {
        const req = {}
        const res = {
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })
    })

    describe('Sample Model', () => {
      let SampleMock

      beforeEach(() => {
        const SequelizeMock = require('sequelize-mock')
        const dbMock = new SequelizeMock()

        SampleMock = dbMock.define('sample', {
          id: 'a960ebbe-e906-4042-9680-20866c03d568',
          group: 'foo'
        })
      })

      describe('create', () => {
        beforeEach(() => {
          middleware = middlewares.sampleCreate

          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'create') {
              console.log('query', query)
              return SampleMock.build({id: '419ed254-4241-473a-a123-ab45c71d901b'})
            }
          })
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('create')
        })

        it('should propagate error when uuid is missing', () => {
          const req = {file: {}}
          const res = {}
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(Error)
              expect(next.firstCall.args[0].message).to.equal("The request object should contain a 'uuid' property, it should have been set in the 'generateUUID' middleware")
            })
        })

        it('should propagate error when file is missing', () => {
          const req = {uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7'}
          const res = {}
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(Error)
              expect(next.firstCall.args[0].message).to.equal("The request object should contain a 'file' property, it should have been set in the 'multer' middleware")
            })
        })

        it('should return the created sample', () => {
          const req = {
            uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
            body: {
              container: 'foo',
              label: 'bar',
              group: 'baz'
            },
            file: {
              originalname: 'biz',
              path: 'buz'
            }
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(201)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('sample')
              expect(res.extra.sample).to.include({ id: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7' })
              expect(next.calledOnce).to.be.true
            })
        })

        afterEach(function () {
          SampleMock.$queryInterface.$clearResults()
        })
      })

      describe('destroy', () => {
        beforeEach(() => {
          middleware = middlewares.sampleDestroy
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('destroy')
        })

        it('should return null sample', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const destroy = middleware(SampleMock)
          return destroy(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(204)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('sample')
              expect(res.extra.sample).to.be.null
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the sample with the given ID is missing', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve sample n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          SampleMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          SampleMock.$queryInterface.$clearResults()
        })
      })

      describe('findAll', () => {
        beforeEach(() => {
          middleware = middlewares.sampleFindAll
          // the 'all' method doesn't exist so we map it
          SampleMock.all = SampleMock.findAll
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findAll')
        })

        it('should return samples', () => {
          const req = {
            query: {}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(SampleMock)
          return findAll(req, res, next)
            .then(() => {
              expect(res).to.have.property('status')
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('samples')
              expect(res.extra.samples[0]).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(next.calledOnce).to.be.true
            })
        })

        it('should return samples filtered by group', () => {
          const req = {
            query: {group: 'bar'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(SampleMock)
          return findAll(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('samples')
              expect(res.extra.samples[0]).to.include({group: 'bar'})
              expect(res.extra.samples[0]).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error when find fails', () => {
          SampleMock.$queueFailure('Test error')

          const req = {
            query: {}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(SampleMock)
          return findAll(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
            })
        })

        afterEach(function () {
          SampleMock.$queryInterface.$clearResults()
        })
      })

      describe('findById', () => {
        beforeEach(() => {
          middleware = middlewares.sampleFindById
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findById')
        })

        it('should return a sample with the given ID', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('sample')
              expect(res.extra.sample).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the sample with the given ID is missing', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(SampleMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
            })
        })

        it('should propagate error when find fails', () => {
          SampleMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findById = middleware(SampleMock)
          return findById(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          SampleMock.$queryInterface.$clearResults()
        })
      })

      describe('update', () => {
        beforeEach(() => {
          middleware = middlewares.sampleUpdate
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('update')
        })

        it('should update the sample and return it', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({
                  id: 'a960ebbe-e906-4042-9680-20866c03d568',
                  path: 'foo',
                  filename: 'bar',
                  label: 'baz',
                  group: 'biz'
                })
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'},
            body: {label: 'label', group: 'group'},
            file: {path: 'path', originalname: 'filename'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(SampleMock)
          return update(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('sample')
              expect(res.extra.sample).to.include({
                id: 'a960ebbe-e906-4042-9680-20866c03d568',
                path: 'path',
                filename: 'filename',
                label: 'label',
                group: 'group'
              })
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.undefined
            })
        })

        it('should propagate error if the sample with the given ID is missing', () => {
          SampleMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return SampleMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(SampleMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve sample n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          SampleMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(SampleMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          SampleMock.$queryInterface.$clearResults()
        })
      })
    })
  })

  describe('instrument', () => {
    describe('send', () => {
      beforeEach(() => {
        middleware = middlewares.instrumentSend
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('send')
      })

      it('Response should end when status is 204', () => {
        const req = {}
        const res = {
          statusCode: 204,
          end: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.end.calledOnce).to.be.true
        expect(res.end.firstCall.args[0]).to.be.undefined
      })

      it('Response should send instrument extra prop when present', () => {
        const req = {}
        const res = {
          extra: {instrument: {id: 'f3e0ed25-ca97-4693-8909-1c9e6983cbe7'}},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.instrument)
      })

      it('Response should send instruments extra prop when present', () => {
        const req = {}
        const res = {
          extra: {instruments: [{id: 'f3e0ed25-ca97-4693-8909-1c9e6983cbe7'}]},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.instruments)
      })

      it('should fail when extra prop is empty', () => {
        const req = {}
        const res = {
          extra: {},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })

      it('should fail when extra prop is missing', () => {
        const req = {}
        const res = {
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })
    })

    describe('Instrument Model', () => {
      let InstrumentMock, InstrumentMappingMock

      beforeEach(() => {
        const SequelizeMock = require('sequelize-mock')
        const dbMock = new SequelizeMock()

        InstrumentMappingMock = dbMock.define('InstrumentMapping', {
          id: 'a960ebbe-e906-4042-9680-20866c03d568',
          sampleId: 'db949b10-09ff-4b19-b9e4-9a5823809120'
        })

        InstrumentMock = dbMock.define('Instrument', {
          id: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'
        })
      })

      describe('create', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentCreate

          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'create') {
              return InstrumentMock.build({id: '419ed254-4241-473a-a123-ab45c71d901b'})
            }
          })
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('create')
        })

        it('should propagate error when uuid is missing', () => {
          const req = {file: {}}
          const res = {}
          const next = sinon.spy()

          const create = middleware(InstrumentMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(Error)
              expect(next.firstCall.args[0].message).to.equal("The request object should contain a 'uuid' property, it should have been set in the 'generateUUID' middleware")
            })
        })

        it('should return the created instrument', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'create') {
              return InstrumentMock.build({})
            }
          })

          const req = {
            uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
            body: {label: 'bar'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock)
          return create(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(201)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instrument')
              expect(res.extra.instrument).to.include({
                id: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
                label: 'bar'
              })
              expect(next.calledOnce).to.be.true
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
        })
      })

      describe('destroy', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentDestroy
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('destroy')
        })

        it('should return null instrument', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const destroy = middleware(InstrumentMock)
          return destroy(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(204)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instrument')
              expect(res.extra.instrument).to.be.null
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the instrument with the given ID is missing', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve instrument n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
        })
      })

      describe('update', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentUpdate
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('update')
        })

        it('should update the instrument and return it', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({
                  id: 'a960ebbe-e906-4042-9680-20866c03d568',
                  label: 'baz'
                })
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'},
            body: {label: 'label'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMock)
          return update(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instrument')
              expect(res.extra.instrument).to.include({
                id: 'a960ebbe-e906-4042-9680-20866c03d568',
                label: 'label'
              })
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.undefined
            })
        })

        it('should propagate error if the instrument with the given ID is missing', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve instrument n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
        })
      })

      describe('findById', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentFindById
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findById')
        })

        it('should return a instrument with the given ID', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findById = middleware(InstrumentMock, InstrumentMappingMock)
          return findById(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instrument')
              expect(res.extra.instrument).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the instrument with the given ID is missing', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findById = middleware(InstrumentMock, InstrumentMappingMock)
          return findById(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
            })
        })

        it('should propagate error when find fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findById = middleware(InstrumentMock, InstrumentMappingMock)
          return findById(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })

      describe('findAll', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentFindAll
          // the 'all' method doesn't exist so we map it
          InstrumentMock.all = InstrumentMock.findAll
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findAll')
        })

        it('should return instruments', () => {
          const req = {
            query: {}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(InstrumentMock, InstrumentMappingMock)
          return findAll(req, res, next)
            .then(() => {
              expect(res).to.have.property('status')
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instruments')
              expect(res.extra.instruments[0]).to.include({id: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'})
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error when find fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            query: {}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(InstrumentMock, InstrumentMappingMock)
          return findAll(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })

      describe('findAllMapping', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentFindAllMapping
          // the 'all' method doesn't exist so we map it
          InstrumentMappingMock.all = InstrumentMappingMock.findAll
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findAllMapping')
        })

        it('should return instruments', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === '0107dbc3-ea1d-49ba-a09d-922dd62fc558') {
                return InstrumentMock.build({id: '0107dbc3-ea1d-49ba-a09d-922dd62fc558'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {instrumentId: '0107dbc3-ea1d-49ba-a09d-922dd62fc558'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(InstrumentMock, InstrumentMappingMock)
          return findAll(req, res, next)
            .then(() => {
              expect(res).to.have.property('status')
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('instruments')
              expect(res.extra.instruments[0]).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.undefined
            })
        })

        it('should propagate error when instrument findBy fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            params: {instrumentId: '0107dbc3-ea1d-49ba-a09d-922dd62fc558'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(InstrumentMock, InstrumentMappingMock)
          return findAll(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
            })
        })

        it('should propagate error when findAllMapping fails', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === '0107dbc3-ea1d-49ba-a09d-922dd62fc558') {
                return InstrumentMock.build({id: '0107dbc3-ea1d-49ba-a09d-922dd62fc558'})
              } else {
                return null
              }
            }
          })
          InstrumentMappingMock.$queueFailure('Test error')

          const req = {
            params: {instrumentId: '0107dbc3-ea1d-49ba-a09d-922dd62fc558'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findAll = middleware(InstrumentMock, InstrumentMappingMock)
          return findAll(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })
    })
  })

  describe('mapping', () => {
    describe('send', () => {
      beforeEach(() => {
        middleware = middlewares.mappingSend
      })

      it('should be a valid function', () => {
        expect(middleware).to.exist
        expect(typeof middleware).to.equal('function')
        expect(middleware.name).to.equal('send')
      })

      it('Response should end when status is 204', () => {
        const req = {}
        const res = {
          statusCode: 204,
          end: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.end.calledOnce).to.be.true
        expect(res.end.firstCall.args[0]).to.be.undefined
      })

      it('Response should send mapping extra prop when present', () => {
        const req = {}
        const res = {
          extra: {mapping: {id: 'd7fd4d92-d49f-4688-b963-58622589d90e'}},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.mapping)
      })

      it('Response should send mappings extra prop when present', () => {
        const req = {}
        const res = {
          extra: {mappings: [{id: 'd7fd4d92-d49f-4688-b963-58622589d90e'}]},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.called).to.be.false
        expect(res.send.calledOnce).to.be.true
        expect(res.send.firstCall.args[0]).to.deep.equal(res.extra.mappings)
      })

      it('should fail when extra prop is empty', () => {
        const req = {}
        const res = {
          extra: {},
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })

      it('should fail when extra prop is missing', () => {
        const req = {}
        const res = {
          send: sinon.spy()
        }
        const next = sinon.spy()

        middleware(req, res, next)

        expect(next.calledOnce).to.be.true
        expect(next.firstCall.args[0]).to.be.instanceOf(Error)
        expect(res.send.called).to.be.false
      })
    })

    describe('InstrumentMapping Model', () => {
      let InstrumentMappingMock, InstrumentMock

      beforeEach(() => {
        const SequelizeMock = require('sequelize-mock')
        const dbMock = new SequelizeMock()

        InstrumentMock = dbMock.define('Instrument', {
          id: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'
        })

        InstrumentMappingMock = dbMock.define('InstrumentMapping', {
          id: 'a960ebbe-e906-4042-9680-20866c03d568',
          sampleId: 'db949b10-09ff-4b19-b9e4-9a5823809120'
        })
      })

      describe('create', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentMappingCreate
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('create')
        })

        it('should propagate error when uuid is missing', () => {
          const req = {}
          const res = {}
          const next = sinon.spy()

          const create = middleware(InstrumentMock, InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(Error)
              expect(next.firstCall.args[0].message).to.equal("The request object should contain a 'uuid' property, it should have been set in the 'generateUUID' middleware")
            })
        })

        it('should return the created instrument mapping', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12') {
                return InstrumentMock.build({id: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'})
              } else {
                return null
              }
            }
          })
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'create') {
              return InstrumentMappingMock.build({
                id: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
                instrumentId: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'
              })
            }
          })

          const req = {
            uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
            params: {instrumentId: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'},
            body: {
              lowerRank: 30,
              upperRank: 40,
              referenceRank: 40,
              sampleId: '511bd232-5f5f-41dd-b68b-34103fbce24f'
            }
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock, InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(201)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('mapping')
              expect(res.extra.mapping).to.include({
                id: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
                instrumentId: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12',
                lowerRank: 30,
                upperRank: 40,
                referenceRank: 40,
                sampleId: '511bd232-5f5f-41dd-b68b-34103fbce24f'
              })
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the instrument with the given ID is missing', () => {
          InstrumentMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12') {
                return InstrumentMock.build({id: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'})
              } else {
                return null
              }
            }
          })

          const req = {
            uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
            params: {instrumentId: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock, InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
            })
        })

        it('should propagate error when instrument findBy fails', () => {
          InstrumentMock.$queueFailure('Test error')

          const req = {
            uuid: 'fa5c3577-a5f9-47b1-ab8c-913af0db9ad7',
            params: {instrumentId: 'bf0c7e2a-3ce0-449e-80ff-f04a7cda3a12'},
            body: {
              lowerRank: 30,
              upperRank: 40,
              referenceRank: 40,
              sampleId: '511bd232-5f5f-41dd-b68b-34103fbce24f'
            }
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMock, InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMock.$queryInterface.$clearResults()
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })

      describe('destroy', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentMappingDestroy
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('destroy')
        })

        it('should return null instrument mapping', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const destroy = middleware(InstrumentMappingMock)
          return destroy(req, res, next)
            .then(() => {
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(204)
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('mapping')
              expect(res.extra.mapping).to.be.null
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the instrument mapping with the given ID is missing', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve instrument mapping n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          InstrumentMappingMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })

      describe('findById', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentMappingFindById
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('findById')
        })

        it('should return a instrument mapping with the given ID', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('mapping')
              expect(res.extra.mapping).to.include({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
            })
        })

        it('should propagate error if the instrument mapping with the given ID is missing', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const create = middleware(InstrumentMappingMock)
          return create(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
            })
        })

        it('should propagate error when find fails', () => {
          InstrumentMappingMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const findById = middleware(InstrumentMappingMock)
          return findById(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })

      describe('update', () => {
        beforeEach(() => {
          middleware = middlewares.instrumentMappingUpdate
        })

        it('should be a valid function', () => {
          expect(middleware).to.exist
          expect(typeof middleware).to.equal('function')
          expect(middleware.name).to.equal('update')
        })

        it('should update the instrument mapping and return it', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({
                  id: 'a960ebbe-e906-4042-9680-20866c03d568',
                  lowerRank: 30,
                  upperRank: 40,
                  referenceRank: 50,
                  sampleId: 'ffdadc29-0a4d-4514-b014-20d55b505ede',
                  instrumentId: 'b8e0104e-b6b9-4657-8b9a-a43431ebeebe'
                })
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: 'a960ebbe-e906-4042-9680-20866c03d568'},
            body: {
              lowerRank: 31,
              upperRank: 40,
              referenceRank: 51,
              sampleId: '9dbb20a8-363e-4804-8a87-e3958615ee7e'
            }
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMappingMock)
          return update(req, res, next)
            .then(() => {
              expect(res).to.have.property('extra')
              expect(res.extra).to.have.property('mapping')
              expect(res.extra.mapping).to.include({
                lowerRank: 31,
                upperRank: 40,
                referenceRank: 51,
                sampleId: '9dbb20a8-363e-4804-8a87-e3958615ee7e',
                instrumentId: 'b8e0104e-b6b9-4657-8b9a-a43431ebeebe'
              })
              expect(res.status.calledOnce).to.be.true
              expect(res.status.firstCall.args[0]).to.equal(200)
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.undefined
            })
        })

        it('should propagate error if the instrument mapping with the given ID is missing', () => {
          InstrumentMappingMock.$queryInterface.$useHandler(function (query, queryOptions, done) {
            if (query === 'findById') {
              if (queryOptions[0] === 'a960ebbe-e906-4042-9680-20866c03d568') {
                return InstrumentMappingMock.build({id: 'a960ebbe-e906-4042-9680-20866c03d568'})
              } else {
                return null
              }
            }
          })

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMappingMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(404)
              expect(next.firstCall.args[0].message).to.equal('Failed to retrieve instrument mapping n°91dde12d-5753-46db-9479-61ae39d7d1a0')
            })
        })

        it('should propagate error when removal fails', () => {
          InstrumentMappingMock.$queueFailure('Test error')

          const req = {
            params: {id: '91dde12d-5753-46db-9479-61ae39d7d1a0'}
          }
          const res = {
            status: sinon.spy()
          }
          const next = sinon.spy()

          const update = middleware(InstrumentMappingMock)
          return update(req, res, next)
            .then(() => {
              expect(next.calledOnce).to.be.true
              expect(next.firstCall.args[0]).to.be.instanceOf(DatabaseError)
              expect(next.firstCall.args[0].status).to.equal(400)
              expect(next.firstCall.args[0].message).to.equal('SequelizeBaseError')
            })
        })

        afterEach(function () {
          InstrumentMappingMock.$queryInterface.$clearResults()
        })
      })
    })
  })
})
