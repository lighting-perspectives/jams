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
              expect(next.firstCall.args[0].message).to.equal("The 'uuid' property of request is missing, it should set in generateUUID middleware")
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
              expect(next.firstCall.args[0].message).to.equal("The 'file' property of request is missing, it should set in multer middleware")
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
  })
})
