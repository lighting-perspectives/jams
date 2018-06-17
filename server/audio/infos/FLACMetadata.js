const fs = require('fs')
const Parser = require('binary-parser').Parser

/**
 * Represents a FLAC file matadata.
 *
 * @see https://xiph.org/flac/format.html#frame_header
 */
class FLACMetadata {
  /**
   * @param filename FLAC file name to parse
   */
  constructor (filename) {
    this._filename = filename
    this._parser = formatParser
  }

  /**
   * @returns {Promise<any>}
   */
  infos () {
    const filename = this._filename

    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err) return reject(err)

        let format
        try {
          format = this._parser.parse(data)
        } catch (e) {
          if (e instanceof RangeError && e.code === 'ERR_BUFFER_OUT_OF_BOUNDS') {
            return resolve(null)
          }
        }

        if (format.identifier === 'fLaC') {
          return resolve({
            format: 'FLAC',
            sampleRate: format.streamInfo.blockData.sampleRate.toString(),
            numChannels: format.streamInfo.blockData.numChannelsMinus1 + 1
          })
        }

        return resolve(null)
      })
    })
  }

  /**
   * Checks whether a file has a FLAC format or not.
   *
   * @returns {Promise<boolean>}
   */
  isFLAC () {
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

        resolve(format.identifier === 'fLaC')
      })
    })
  }
}

module.exports = FLACMetadata

const metadataBlockHeaderParser = new Parser()
  .bit1('lastMetaDataBlock') // 1 if last, 0 otherwise
  .bit7('blockType') // 0 STREAMINFO
  .bit24('lengthOfMetadataToFollow') // in bytes

const streamInfoBlockDataParser = new Parser()
  .uint16('minimumBlockSize')
  .uint16('maximumBlockSize')
  .skip(3) // .uint24('minimumFrameSize')
  .skip(3) // .uint24('maximumFrameSize')
  .bit20('sampleRate')
  .bit3('numChannelsMinus1')
  .bit5('bitsPerSample')

const streamInfoBlockParser = new Parser()
  .nest('blockHeader', {
    type: metadataBlockHeaderParser
  })
  .nest('blockData', {
    type: streamInfoBlockDataParser
  })

const formatParser = new Parser()
  .string('identifier', {length: 4})
  .nest('streamInfo', {
    type: streamInfoBlockParser
  })
