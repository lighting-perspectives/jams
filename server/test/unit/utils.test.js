/* eslint-disable no-undef,no-unused-expressions */
const expect = require('chai').expect

let utils, map

describe('utils', function () {
  beforeEach(function () {
    utils = require('../../utils')
  })

  it('should return utils', function () {
    expect(utils).to.exist
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
