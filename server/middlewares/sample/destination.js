const path = require('path')

/**
 * Set the uploaded file destination. Used in multer middleware.
 *
 * @see middlewares.sample.multer
 *
 * @param req
 * @param file
 * @param cb
 */
const destination = (req, file, cb) => {
  const dir = process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '../../test/data/files')
    : path.join(__dirname, '../../static/audio')

  cb(null, dir)
}

module.exports = destination
