const fs = require('fs')
const Parser = require('binary-parser').Parser

/**
 * Represents a WAVE file metadata.
 *
 * @see http://soundfile.sapp.org/doc/WaveFormat/
 */
class WAVEMetadata {
  constructor (filename) {
    this._filename = filename
    this._parser = waveFormatParser
  }

  /**
   * @returns {Promise<any>}
   */
  infos () {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, (err, data) => {
        if (err) return reject(err)

        let format
        try {
          format = this._parser.parse(data)
        } catch (e) {
          if (e instanceof RangeError && e.code === 'ERR_BUFFER_OUT_OF_BOUNDS') {
            return resolve(null)
          }
        }

        let info = null
        if (format.riffChunk.chunkID === 'RIFF' && format.riffChunk.format === 'WAVE') {
          info = {
            format: format.riffChunk.format,
            audioFormat: format.fmtSubChunk.audioFormat,
            sampleRate: format.fmtSubChunk.sampleRate,
            bitsPerSample: format.fmtSubChunk.bitsPerSample,
            numChannels: format.fmtSubChunk.numChannels
          }
        }

        return resolve(info)
      })
    })
  }

  /**
   * Checks whether a file has a WAVE format or not.
   * @returns {Promise<boolean>}
   */
  isWAVE () {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filename, (err, data) => {
        if (err) return reject(err)

        let format
        try {
          format = this._parser.parse(data)
        } catch (e) {
          if (e instanceof RangeError && e.code === 'ERR_BUFFER_OUT_OF_BOUNDS') {
            return resolve(false)
          }
        }

        return resolve(format.riffChunk.chunkID === 'RIFF' && format.riffChunk.format === 'WAVE')
      })
    })
  }
}

module.exports = WAVEMetadata

const audioFormatFormatter = fmt => {
  if (fmt === 1) return 'PCM'
  if (fmt === 80) return 'MPEG-1 Audio'
  return fmt
}

const riffChunkParser = new Parser()
  .string('chunkID', {length: 4})
  .uint32le('chunkSize')
  .string('format', {length: 4})

const fmtSubChunkParser = new Parser()
  .string('subChunk1ID', {length: 4})
  .uint32le('subChunk1Size')
  .uint16le('audioFormat', {formatter: audioFormatFormatter})
  .uint16le('numChannels')
  .uint32le('sampleRate')
  .uint32le('byteRate')
  .uint16le('blockAlign')
  .uint16le('bitsPerSample')

const waveFormatParser = new Parser()
  .nest('riffChunk', {
    type: riffChunkParser
  })
  .nest('fmtSubChunk', {
    type: fmtSubChunkParser
  })
