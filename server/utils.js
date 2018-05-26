const NotAudioFileError = require('./errors/NotAudioFileError')

module.exports = {
  mp4Filter: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MP4|wav|WAV)$/)) {
      return cb(new NotAudioFileError(), false)
    }
    cb(null, true)
  },
  noteToRank: function (note, map) {
    if (typeof note !== 'string' && !(note instanceof String)) {
      throw new TypeError(`String expected, got ${note} instead`)
    }

    map = map || noteMap

    for (let [rank, value] of map.entries()) {
      if (value === note) {
        return rank
      }
    }
    throw new Error(`Failed to retrieve rank for note ${note}`)
  },
  rankToNote: function (rank, map) {
    if (!Number.isInteger(rank)) {
      throw new TypeError(`Number expected, got ${rank} instead`)
    }

    map = map || noteMap

    const note = map.get(rank)
    if (note === undefined) {
      throw new Error(`Failed to retrieve note for rank ${rank}`)
    }

    return note
  }
}

const noteMap = new Map([
  [60, 'C3'],
  [59, 'B2'],
  [58, 'Adièse2'],
  [57, 'A2'],
  [56, 'Gdièse2'],
  [55, 'G2'],
  [54, 'Fdièse2'],
  [53, 'F2'],
  [52, 'E2'],
  [51, 'Ddièse2'],
  [50, 'D2'],
  [49, 'Cdièse2'],
  [48, 'C2'],
  [47, 'B1'],
  [46, 'Adièse1'],
  [45, 'A1'],
  [44, 'Gdièse1'],
  [43, 'G1'],
  [42, 'Fdièse1'],
  [41, 'F1'],
  [40, 'E1'],
  [39, 'Ddièse1'],
  [38, 'D1'],
  [37, 'Cdièse1'],
  [36, 'C1'],
  [35, 'B0'],
  [34, 'Adièse0'],
  [33, 'A0'],
  [32, 'Gdièse0'],
  [31, 'G0'],
  [30, 'Fdièse0'],
  [29, 'F0'],
  [28, 'E0'],
  [27, 'Ddièse0'],
  [26, 'D0'],
  [25, 'Cdièse0'],
  [24, 'C0'],
  [23, 'B-1'],
  [22, 'Adièse-1'],
  [21, 'A-1']
])
