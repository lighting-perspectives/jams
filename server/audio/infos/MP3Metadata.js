const fs = require('fs')
const Parser = require('binary-parser').Parser

class MP3Metadata {
  constructor (filename) {
    this._filename = filename
    this._parser = mp3FrameParser
  }

  infos () {
    const parser = this._parser
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, (err, data) => {
        if (err) return reject(err)

        let format
        try {
          format = parser.parse(data)
        } catch (e) {
          if (e instanceof RangeError && e.code === 'ERR_BUFFER_OUT_OF_BOUNDS') {
            return resolve(null)
          }
        }
        let infos = null
        if (format.data.header && format.data.header.magicNumber === 'fffb') {
          infos = {
            format: 'MP3 (MPEG version 1 Layer III)',
            sampleRate: samplingRateFormatter(format.data.header.samplingRateFrequencyIndex),
            bitRate: bitrateFormatter(format.data.header.bitRateIndex),
            channelMode: format.data.header.channelMode
          }
        }
        if (format.data.magicNumber === 'fb') {
          infos = {
            format: 'MP3 (MPEG version 1 Layer III)',
            sampleRate: samplingRateFormatter(format.data.samplingRateFrequencyIndex),
            bitRate: bitrateFormatter(format.data.bitRateIndex),
            channelMode: format.data.channelMode
          }
        }

        return resolve(infos)
      })
    })
  }

  isMP3 () {
    const parser = this._parser
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, (err, data) => {
        if (err) return reject(err)

        let format
        try {
          format = parser.parse(data)
        } catch (e) {
          if (e instanceof RangeError && e.code === 'ERR_BUFFER_OUT_OF_BOUNDS') {
            return resolve(false)
          }
        }

        return resolve(
          (format.data.header && format.data.header.magicNumber === 'fffb') ||
          format.data.magicNumber === 'fb'
        )
      })
    })
  }
}

module.exports = MP3Metadata

const bitrateFormatter = index => {
  if (!index) return 'bitrate'
  switch (index.toString(2)) {
    case '0':
      return 'free'
    case '1':
      return '32'
    case '10':
      return '40'
    case '11':
      return '48'
    case '100':
      return '56'
    case '101':
      return '64'
    case '110':
      return '80'
    case '111':
      return '96'
    case '1000':
      return '112'
    case '1001':
      return '128'
    case '1010':
      return '160'
    case '1011':
      return '192'
    case '1100':
      return '224'
    case '1101':
      return '256'
    case '1110':
      return '320'
    case '1111':
      return 'bad'
  }
}

const samplingRateFormatter = function (index) {
  switch (index) {
    case 0:
      return '44100'
    case 1:
      return '48000'
    case 2:
      return '32000'
    case 3:
      return 'reserved'
  }
}

const channelModeFormatter = mode => {
  switch (mode.toString(2)) {
    case '0':
      return 'Stereo'
    case '1':
      return 'Joint stereo (Stereo)'
    case '10':
      return 'Dual channel (Stereo)'
    case '11':
      return 'Single channel (Mono)'
  }
}

const mpegAudioFrameHeaderParser = new Parser()
  // .bit11('frameSync') // 11111111111
  // .bit2('MPEGAudioVersionID', {formatter: versionFormatter}) // 11
  // .bit2('layerIndex', {formatter: layerFormatter}) // 01
  // .bit1('protectionBit', {formatter: protectionBitFormatter}) // 1
  .string('magicNumber', {encoding: 'hex', length: 1})
  .bit4('bitRateIndex', {formatter: bitrateFormatter})
  .bit2('samplingRateFrequencyIndex', {formatter: samplingRateFormatter})
  .bit1('paddingBit')
  .bit1('privateBit')
  .bit2('channelMode', {formatter: channelModeFormatter})

const id3v2HeaderParser = new Parser()
  .string('identifierD', {length: 1})
  .string('identifier3', {length: 1})
  .uint8('majorVersion')
  .uint8('revisionVersion')
  .bit1('unsynchronisation')
  .bit1('extendedHeader')
  .bit1('experimentalIndicator')
  .bit1('footerPresent')
  .bit4('flags') // 0000
  .uint32('tagSize')
  .array('data', {
    type: 'uint8',
    length: function () { // UInt32 sync safe
      const mask = 0b01111111
      const synch = this.tagSize
      let b1 = synch & mask
      let b2 = (synch >> 8) & mask
      let b3 = (synch >> 16) & mask
      let b4 = (synch >> 24) & mask

      return b1 | (b2 << 7) | (b3 << 14) | (b4 << 21)
    }
  })
  .string('magicNumber', {encoding: 'hex', length: 2})
  .bit4('bitRateIndex', {formatter: bitrateFormatter})
  .bit2('samplingRateFrequencyIndex', {formatter: samplingRateFormatter})
  .bit1('paddingBit')
  .bit1('privateBit')
  .bit2('channelMode', {formatter: channelModeFormatter})

const id3v2TagParser = new Parser()
  .nest('header', {type: id3v2HeaderParser})

  // A MP3 file should begin by a ID3v2 tag or not
const mp3FrameParser = new Parser()
  .string('identifierI', {length: 1, encoding: 'hex'})
  .choice('data', {
    tag: function () {
      switch (this.identifierI) {
        case '49':
          return 1
        case 'ff':
          return 2
        default:
          return 3
      }
    },
    choices: {
      1: id3v2TagParser,
      2: mpegAudioFrameHeaderParser,
      3: Parser.start()
    }
  })
