/* eslint-disable no-undef,no-unused-expressions */
const expect = require('chai').expect

const NotAudioFileError = require('../../errors/NotAudioFileError')

let middlewares, generateUUID, sample, audioFilter, destination, filename

describe('middlewares', () => {
  beforeEach(() => {
    middlewares = require('../../middlewares')
  })

  it('should return middlewares', () => {
    expect(middlewares).to.exist
  })

  describe('generateUUID', () => {
    beforeEach(() => {
      generateUUID = middlewares.generateUUID
    })

    it('should generateUUID be a valid function', () => {
      expect(generateUUID).to.exist
      expect(typeof generateUUID).to.equal('function')
    })

    it('should add a uuid attribute to req', () => {
      let req = {}
      let result = ''
      const fn = () => { result = 'next executed' }
      generateUUID(req, {}, fn)

      expect(req).to.have.property('uuid')
      expect(req.uuid).to.have.lengthOf(36)
      expect(result).to.equal('next executed')
    })
  })

  describe('sample', () => {
    beforeEach(() => {
      sample = middlewares.sample
    })

    it('should return sample', () => {
      expect(sample).to.exist
    })

    describe('audioFilter', () => {
      beforeEach(() => {
        audioFilter = sample.audioFilter
      })

      it('should return audioFilter', () => {
        expect(audioFilter).to.exist
      })

      it('should pass when valid file is valid', () => {
        let file = {originalname: 'foo.Wav'}
        let error, test
        let fn = (e, t) => {
          error = e
          test = t
        }
        audioFilter({}, file, fn)

        expect(error).to.be.null
        expect(test).to.be.true
      })

      it('should return error when file is invalid', () => {
        let file = {originalname: 'foo.txt'}
        let error, test
        let fn = (e, t) => {
          error = e
          test = t
        }
        audioFilter({}, file, fn)

        expect(error).to.be.instanceOf(NotAudioFileError)
        expect(test).to.be.false
      })
    })

    describe('destination', () => {
      beforeEach(() => {
        destination = sample.destination
      })

      it('should destination be a valid function', () => {
        expect(destination).to.exist
        expect(typeof destination).to.equal('function')
      })

      it('should return a directory', () => {
        let error, test
        let fn = (e, t) => {
          error = e
          test = t
        }
        destination({}, {}, fn)

        expect(error).to.be.null
        expect(typeof test).to.equal('string')
      })
    })

    describe('filename', () => {
      beforeEach(() => {
        filename = sample.filename
      })

      it('should filename be a valid function', () => {
        expect(filename).to.exist
        expect(typeof filename).to.equal('function')
      })

      it('should return a uuid as filename', () => {
        let error, test
        let fn = (e, t) => {
          error = e
          test = t
        }
        filename({uuid: '8515a198-356e-46ce-b58e-2a9f757941a6'}, {}, fn)

        expect(error).to.be.null
        expect(test).to.equal('8515a198-356e-46ce-b58e-2a9f757941a6')
      })
    })

    describe('multer', () => {
      it('should multer be a valid function', () => {
        expect(sample.multer).to.exist
        expect(typeof sample.multer).to.equal('function')
      })
    })
  })
})
