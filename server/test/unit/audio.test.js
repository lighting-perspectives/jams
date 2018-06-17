/* eslint-disable no-unused-expressions */
const path = require('path')
const expect = require('chai').expect

const infos = require('../../audio/infos')
const WAVEMetadata = require('../../audio/infos/WAVEMetadata')
const FLACMetadata = require('../../audio/infos/FLACMetadata')
const MP3Metadata = require('../../audio/infos/MP3Metadata')

describe('AUDIO', () => {
  describe('WAVEMetada class', () => {
    const testProvider = [
      {type: 'wave',
        filename: 'sample.wav',
        expected: {
          isWAVE: true,
          infos: {format: 'WAVE', audioFormat: 'PCM', sampleRate: 11025, bitsPerSample: 8, numChannels: 1}
        }},
      {type: 'bwf',
        filename: 'bwf.wav',
        expected: {
          isWAVE: true,
          infos: {format: 'WAVE', audioFormat: 'PCM', sampleRate: 32000, bitsPerSample: 16, numChannels: 2}
        }},
      {type: 'aac', filename: 'sample.aac', expected: {isWAVE: false, infos: null}},
      {type: 'aiff', filename: 'sample.aiff', expected: {isWAVE: false, infos: null}},
      {type: 'm4a', filename: 'sample.m4a', expected: {isWAVE: false, infos: null}},
      {type: 'mp3', filename: 'sample.mp3', expected: {isWAVE: false, infos: null}},
      {type: 'ogg', filename: 'sample.ogg', expected: {isWAVE: false, infos: null}},
      {type: 'flac', filename: 'sample.flac', expected: {isWAVE: false, infos: null}},
      {type: 'txt', filename: 'dummy.txt', expected: {isWAVE: false, infos: null}}
    ]

    describe('isWAVE()', () => {
      testProvider.forEach(test => {
        it(`it should return ${test.expected.isWAVE} when file is ${test.type}`, () => {
          const metadata = new WAVEMetadata(path.join(__dirname, '../data/samples', test.filename))

          return metadata.isWAVE()
            .then(result => {
              if (test.expected.isWAVE === true) expect(result).to.be.true
              if (test.expected.isWAVE === false) expect(result).to.be.false
            })
        })
      })
    })

    describe('infos()', () => {
      testProvider.forEach(test => {
        it(`it should return ${test.expected.infos ? 'metadata' : test.expected.infos} when file is ${test.type}`, () => {
          const metadata = new WAVEMetadata(path.join(__dirname, '../data/samples', test.filename))

          return metadata.infos()
            .then(result => {
              if (test.expected.infos) {
                expect(result).to.deep.equal(test.expected.infos)
              } else {
                expect(result).to.be.null
              }
            })
        })
      })
    })
  })

  describe('FLACMetada class', () => {
    const testProvider = [
      {type: 'flac',
        filename: 'sample.flac',
        expected: {
          isFLAC: true,
          infos: {format: 'FLAC', sampleRate: '11025', numChannels: 1}
        }},
      {type: 'aac', filename: 'sample.aac', expected: {isFLAC: false, infos: null}},
      {type: 'aiff', filename: 'sample.aiff', expected: {isFLAC: false, infos: null}},
      {type: 'm4a', filename: 'sample.m4a', expected: {isFLAC: false, infos: null}},
      {type: 'mp3', filename: 'sample.mp3', expected: {isFLAC: false, infos: null}},
      {type: 'ogg', filename: 'sample.ogg', expected: {isFLAC: false, infos: null}},
      {type: 'wav', filename: 'sample.wav', expected: {isFLAC: false, infos: null}},
      {type: 'bwf', filename: 'bwf.wav', expected: {isFLAC: false, infos: null}},
      {type: 'txt', filename: 'dummy.txt', expected: {isFLAC: false, infos: null}}
    ]

    describe('isFLAC()', () => {
      testProvider.forEach(test => {
        it(`it should return ${test.expected.isFLAC} when file is ${test.type}`, () => {
          const metadata = new FLACMetadata(path.join(__dirname, '../data/samples', test.filename))

          return metadata.isFLAC()
            .then(result => {
              if (test.expected.isFLAC === true) expect(result).to.be.true
              if (test.expected.isFLAC === false) expect(result).to.be.false
            })
        })
      })
    })

    describe('infos()', () => {
      testProvider.forEach(test => {
        it(
          `it should return ${test.expected.infos ? 'metadata' : test.expected.infos} when file is ${test.type}`,
          () => {
            const metadata = new FLACMetadata(path.join(__dirname, '../data/samples', test.filename))

            return metadata.infos()
              .then(result => {
                if (test.expected.infos) {
                  expect(result).to.deep.equal(test.expected.infos)
                } else {
                  expect(result).to.be.null
                }
              })
          })
      })
    })
  })

  describe('MP3Metada class', () => {
    const testProvider = [
      {type: 'mp3',
        filename: 'sample.mp3',
        expected: {
          isMP3: true,
          infos: {
            format: 'MP3 (MPEG version 1 Layer III)',
            bitRate: '128',
            sampleRate: '44100',
            channelMode: 'Joint stereo (Stereo)'
          }
        }},
      {type: 'aac', filename: 'sample.aac', expected: {isMP3: false, infos: null}},
      {type: 'aiff', filename: 'sample.aiff', expected: {isMP3: false, infos: null}},
      {type: 'm4a', filename: 'sample.m4a', expected: {isMP3: false, infos: null}},
      {type: 'flac', filename: 'sample.flac', expected: {isMP3: false, infos: null}},
      {type: 'ogg', filename: 'sample.ogg', expected: {isMP3: false, infos: null}},
      {type: 'wav', filename: 'sample.wav', expected: {isMP3: false, infos: null}},
      {type: 'bwf', filename: 'bwf.wav', expected: {isFLAC: false, infos: null}},
      {type: 'txt', filename: 'dummy.txt', expected: {isMP3: false, infos: null}}
    ]

    describe('isMP3()', () => {
      testProvider.forEach(test => {
        it(`it should return ${test.expected.isMP3} when file is ${test.type}`, () => {
          const metadata = new MP3Metadata(path.join(__dirname, '../data/samples', test.filename))

          return metadata.isMP3()
            .then(result => {
              if (test.expected.isMP3 === true) expect(result).to.be.true
              if (test.expected.isMP3 === false) expect(result).to.be.false
            })
        })
      })
    })

    describe('infos()', () => {
      testProvider.forEach(test => {
        it(
          `it should return ${test.expected.infos ? 'metadata' : test.expected.infos} when file is ${test.type}`,
          () => {
            const metadata = new MP3Metadata(path.join(__dirname, '../data/samples', test.filename))

            return metadata.infos()
              .then(result => {
                if (test.expected.infos) {
                  expect(result).to.deep.equal(test.expected.infos)
                } else {
                  expect(result).to.be.null
                }
              })
          })
      })
    })
  })

  describe('audioInfos', () => {
    const testProvider = [
      { type: 'wave',
        filename: 'sample.wav',
        expected: {
          format: 'WAVE',
          audioFormat: 'PCM',
          sampleRate: 11025,
          bitsPerSample: 8,
          numChannels: 1
        }
      },
      {
        type: 'bwf',
        filename: 'bwf.wav',
        expected: {
          format: 'WAVE',
          audioFormat: 'PCM',
          sampleRate: 32000,
          bitsPerSample: 16,
          numChannels: 2
        }
      },
      { type: 'wave (w/out extension)',
        filename: 'sample_wav',
        expected: {
          format: 'WAVE',
          audioFormat: 'PCM',
          sampleRate: 44100,
          bitsPerSample: 16,
          numChannels: 1
        }
      },
      {type: 'aac', filename: 'sample.aac', expected: null},
      {type: 'aiff', filename: 'sample.aiff', expected: null},
      {type: 'm4a', filename: 'sample.m4a', expected: null},
      {
        type: 'mp3 ID3v2',
        filename: 'sample.mp3',
        expected: {
          format: 'MP3 (MPEG version 1 Layer III)',
          bitRate: '128',
          sampleRate: '44100',
          channelMode: 'Joint stereo (Stereo)'
        }
      },
      {
        type: 'mp3 ID3v2 (w/out extension)',
        filename: 'sample_mp3',
        expected: {
          format: 'MP3 (MPEG version 1 Layer III)',
          bitRate: '128',
          sampleRate: '44100',
          channelMode: 'Joint stereo (Stereo)'
        }
      },
      {
        type: 'mp3',
        filename: 'sample_no_tag.mp3',
        expected: {
          format: 'MP3 (MPEG version 1 Layer III)',
          bitRate: '192',
          sampleRate: '44100',
          channelMode: 'Joint stereo (Stereo)'
        }
      },
      {type: 'ogg', filename: 'sample.ogg', expected: null},
      {
        type: 'flac',
        filename: 'sample.flac',
        expected: {
          format: 'FLAC',
          sampleRate: '11025',
          numChannels: 1
        }
      },
      {
        type: 'flac (w/out extension)',
        filename: 'sample_flac',
        expected: {
          format: 'FLAC',
          sampleRate: '11025',
          numChannels: 1
        }
      },
      {type: 'txt', filename: 'dummy.txt', expected: null},
      {type: 'txt (w/out extension)', filename: 'dummy_text', expected: null}
    ]

    testProvider.forEach(test => {
      it(
        `it should return ${test.expected ? 'metadata' : test.expected} when file is ${test.type}`,
        () => {
          return infos(path.join(__dirname, '../data/samples', test.filename))
            .then(result => {
              expect(result).to.deep.equal(test.expected)
            })
        })
    })
  })
})
