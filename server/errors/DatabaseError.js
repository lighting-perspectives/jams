// Sequelize errors
module.exports = class DatabaseError extends require('./AppError') {
  constructor (error, status, msg) {
    super(error ? (error.original.detail || error.name) : msg, status || 400)

    this.details = error || {}
  }
}
