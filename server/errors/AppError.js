module.exports = class AppError extends Error {
  constructor (message, status) {
    // Calling parent constructor of base Error class.
    super(message)

    this.msg = message

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    this.status = status || 500
  }
}
