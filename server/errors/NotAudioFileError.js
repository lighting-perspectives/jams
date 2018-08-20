const { supportedExtensions } = require('../audio')

module.exports = class NotAudioFileError extends require('./AppError') {
  constructor (extra) {
    super(`The given file is not a supported audio file, supported extensions are: ${supportedExtensions.join(', ')}.`, 400)

    this.extra = extra
  }
}
