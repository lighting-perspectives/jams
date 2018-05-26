/* eslint-disable no-undef,no-unused-expressions */
const expect = require('chai').expect

let utils, fn, map

describe('utils', function () {
  beforeEach(function () {
    utils = require('../../utils')
  })

  it('should return utils', function () {
    expect(utils).to.exist
  })

  describe('mp4filter', function () {
    before(function () {
      fn = function (err, val) {
        if (err) { throw err }

        expect(val).to.be.true
      }
    })
    it('should filter mp4 file', function () {
      utils.mp4Filter(null, {originalname: 'foo.mp4'}, fn)
      utils.mp4Filter(null, {originalname: 'bar.MP4'}, fn)
      utils.mp4Filter(null, {originalname: 'baz.wav'}, fn)
      utils.mp4Filter(null, {originalname: 'biz.WAV'}, fn)
    })

    it('should fail with non-mp4 file', function () {
      expect(function () {
        utils.mp4Filter(null, {originalname: 'foo.mp3'}, fn)
      }).to.throw(Error, 'The given file is not an audio file')

      expect(function () {
        utils.mp4Filter(null, {originalname: 'foo.doc'}, fn)
      }).to.throw(Error, 'The given file is not an audio file')
    })
  })

  describe('rankToNote', function () {
    before(function () {
      map = new Map([[60, 'C3']])
    })

    it('should return note', function () {
      expect(utils.rankToNote(60), map).to.equal('C3')
    })
    it('should fail if rank is not a number', function () {
      expect(function () {
        utils.rankToNote('foo', map)
      }).to.throw(TypeError, 'Number expected, got foo instead')
    })
    it('should fail if no existing mapping', function () {
      expect(function () {
        utils.rankToNote(9999, map)
      }).to.throw(Error, 'Failed to retrieve note for rank 9999')
    })
  })

  describe('noteToRank', function () {
    before(function () {
      map = new Map([[60, 'C3']])
    })

    it('should return rank', function () {
      expect(utils.noteToRank('C3', map)).to.equal(60)
    })

    it('should fail if note is not a string', function () {
      expect(function () {
        utils.noteToRank(9999, map)
      }).to.throw(TypeError, 'String expected, got 9999 instead')
    })

    it('should fail if no existing mapping', function () {
      expect(function () {
        utils.noteToRank('foo', map)
      }).to.throw(Error, 'Failed to retrieve rank for note foo')
    })
  })
})
