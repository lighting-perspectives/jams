module.exports = class NotAudioFileError extends require('./AppError') {
  constructor () {
    super('The given file is not an audio file', 400)
  }
}
