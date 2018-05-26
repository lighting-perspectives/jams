module.exports = class extends require('./AppError') {
  constructor (fields) {
    super('The given file is not an audio file', 400)
    // Saving custom property.
    this.fields = fields || {}
  }
}
